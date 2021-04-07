import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailExsit';

@InputType()
export class RegisterInput {
  @Field()
  @Length(5, 50, { message: 'Username format is not correct' })
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email has already existed' })
  email: string;

  @Field()
  password: string;
}
