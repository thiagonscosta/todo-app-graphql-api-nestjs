import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if(!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if(!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const newUser = await this.userRepository.save(user);

    if(!newUser) {
      throw new InternalServerErrorException('Error on create new user');
    }
    return newUser;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    await this.userRepository.update(user, { ...data });
    return this.userRepository.create({ ...user, ...data }); // create = merge
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findById(id);
    const deleted = await this.userRepository.delete(user);

    if(deleted) {
      return true;
    }

    return false;
  }
}