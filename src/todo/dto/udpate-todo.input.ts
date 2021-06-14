import { InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateTodoInput {

  @IsString()
  @IsOptional()
  title?: string;
  
  @IsOptional()
  done?: boolean;
} 