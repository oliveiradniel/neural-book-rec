import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdParamDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
