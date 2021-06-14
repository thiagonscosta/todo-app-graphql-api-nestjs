import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/udpate-todo.input';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver('Todo')
export class TodoResolver {
  
  constructor(private todoService: TodoService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Query(() => Todo)
  async todo(@Args('id') id: string): Promise<Todo> {
    return await this.todoService.findById(id);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    return await this.todoService.createTodo(input);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id') id: string, 
    @Args('input') input: UpdateTodoInput, 
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: string): Promise<boolean> {
    return await this.todoService.deleteTodo(id);
  }

}
