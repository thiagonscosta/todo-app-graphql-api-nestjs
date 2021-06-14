import { InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput {

  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string;
  
  @IsString()
  @IsNotEmpty({ message: 'This field is required' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'This field is required' })
  @IsOptional()
  email?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'This field is required' })
  @IsOptional()
  password?: string;
}