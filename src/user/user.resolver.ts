import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  
  constructor(
    private userService: UserService
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  } 

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }

  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    return user;
  }

  // mutation é usado para criar ou alterar
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('data') data: UpdateUserInput
  ): Promise<User> {
    const id = "5";
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);    
  }

}
