import * as tf from '@tensorflow/tfjs-node';

import { Injectable } from '@nestjs/common';

import type { EmbedReadingProps } from '../types/feature-engineering/embed-reading.type';
import type { EmbedBookProps } from '../types/feature-engineering/embed-book.type';
import type { EmbedUserProps } from '../types/feature-engineering/embed-user.type';
import type { NormalizeNumberProps } from '../types/feature-engineering/normalize-number.type';
import type {
  MultiHotEncodingProps,
  OneHotEncodingProps,
} from '../types/feature-engineering/hot-encoding.types';

@Injectable()
export class FeatureEngineeringService {
  embedReading({ reading, context }: EmbedReadingProps): tf.Tensor1D {
    const ageTensor = tf.tensor1d([
      context.averageBookAgesNormalized[reading.book.id] ?? 0.5,
    ]);

    const authorTensor = this.oneHotEncoding({
      index: context.authorsIndex[reading.book.authorId],
      length: context.countAuthors,
    });

    const literaryGenresTensor = this.multiHotEncoding({
      indices: reading.book.literaryGenreIds.map(
        (literaryGenreId) => context.literaryGenresIndex[literaryGenreId],
      ),
      length: context.countLiteraryGenres,
    });

    return tf.concat1d([ageTensor, authorTensor, literaryGenresTensor]);
  }

  embedBook({ book, context }: EmbedBookProps): tf.Tensor1D {
    const ageTensor = tf.tensor1d([
      context.averageBookAgesNormalized[book.id] ?? 0.5,
    ]);

    const authorTensor = this.oneHotEncoding({
      index: context.authorsIndex[book.authorId],
      length: context.countAuthors,
    });

    const literaryGenresTensor = this.multiHotEncoding({
      indices: book.literaryGenreIds.map(
        (literaryGenreId) => context.literaryGenresIndex[literaryGenreId],
      ),
      length: context.countLiteraryGenres,
    });

    return tf.concat1d([ageTensor, authorTensor, literaryGenresTensor]);
  }

  embedUser({ user, context }: EmbedUserProps): tf.Tensor1D {
    const completedReadings = user.readings.filter(
      (reading) => reading.rating > 0,
    );
    const isReader = completedReadings.length > 0;

    if (isReader) {
      const userMeanRating =
        completedReadings.reduce((acc, reading) => acc + reading.rating, 0) /
        completedReadings.length;

      const weights = tf.tensor1d(
        completedReadings.map(
          (reading) => (reading.rating - userMeanRating) / 5,
        ),
      );

      const stacked = tf.stack(
        completedReadings.map((reading) =>
          this.embedReading({ reading, context }),
        ),
      );

      const weightedSum = stacked.mul(weights.reshape([-1, 1])).sum(0);

      const weightSumAbs = weights.abs().sum();

      const safeWeightSum = tf.where(
        weightSumAbs.equal(tf.scalar(0)),
        tf.ones([1]),
        weightSumAbs,
      );

      return weightedSum.div(safeWeightSum).reshape([1, context.dimensions]);
    }

    return tf
      .concat1d([
        tf.zeros([1]),
        tf.zeros([1]),
        tf.tensor1d([
          this.normalizeNumber({
            value: user.age,
            min: context.minAge,
            max: context.maxAge,
          }),
        ]),
        tf.zeros([context.countLiteraryGenres]),
        tf.zeros([context.countAuthors]),
      ])
      .reshape([1, context.dimensions]);
  }

  normalizeNumber({ value, min, max }: NormalizeNumberProps): number {
    if (max === min) return 0.5;

    return (value - min) / (max - min);
  }

  private oneHotEncoding({ index, length }: OneHotEncodingProps): tf.Tensor1D {
    return tf.oneHot([index], length).squeeze([0]).cast('float32').as1D();
  }

  private multiHotEncoding({
    indices,
    length,
  }: MultiHotEncodingProps): tf.Tensor1D {
    return tf.tidy(() => {
      const oneHots = tf.oneHot(indices, length);
      const multiHot = oneHots.sum(0);
      return multiHot.cast('float32').as1D();
    });
  }
}
