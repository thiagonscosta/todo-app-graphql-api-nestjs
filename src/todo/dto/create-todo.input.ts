import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTodoInput {
  
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode ser vazio' })
  title: string;

  @Field()
  @IsNotEmpty()
  userId: string;

}