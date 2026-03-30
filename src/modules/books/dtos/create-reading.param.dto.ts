import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReadingParamDTO {
  @IsUUID()
  @IsNotEmpty()
  bookId: string;
}
