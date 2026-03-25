import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadingIdParamDTO {
  @IsUUID()
  @IsNotEmpty()
  readingId: string;
}
