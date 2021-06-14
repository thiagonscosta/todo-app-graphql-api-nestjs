import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class AuthInput {
  
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}