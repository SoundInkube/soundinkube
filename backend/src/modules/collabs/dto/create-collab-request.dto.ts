import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCollabRequestDto {
  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
