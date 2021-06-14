import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/udpate-todo.input';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private readonly userService: UserService
    ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if(!todo) {
      throw new NotFoundException("Todo not found");
    }
    return todo;
  }

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const user = await this.userService.findById(input.userId)
    const todo = this.todoRepository.create({
      title: input.title,
      user
    })
    const newTodo = await this.todoRepository.save(todo);
    if(!newTodo) {
      throw new InternalServerErrorException('Error on create new todo');
    }
    return newTodo;
  }

  async updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.findById(id);
    if (input.done) {
      todo.done = input.done;
    }
    if (input.title) {
      todo.title = input.title;
    }
    const updated = await this.todoRepository.save(todo);
    return updated;
  }

  async deleteTodo(id: string): Promise<boolean> {
    console.log(id)
    const todo = await this.findById(id);
    const deleted = await this.todoRepository.remove(todo)
    console.log(deleted)
    if(deleted) {
      return true; 
    }
    return false;
  }
}
