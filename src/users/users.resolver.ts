import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }
  // @UseGuards(JwtAuthGuard)
  // findAll(@Context() context) {
  //   // Can determine which user is logged in/ requesting data
  //   console.log(context.req.user);
  //   return this.usersService.findAll();
  // }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username', { type: () => Int }) username: string) {
    return this.usersService.findOne(username);
  }
}
