import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Todo } from './todo.entity';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [TodoService, TodoResolver, UserService]
})
export class TodoModule {}
