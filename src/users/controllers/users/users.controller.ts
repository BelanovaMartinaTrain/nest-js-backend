import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  //   @Get()
  //   getUsers(@Query('sortDesc', ParseBoolPipe) sortBy: boolean) {
  //     console.log(sortBy);
  //     return {
  //       username: 'me',
  //       email: 'dunno',
  //     };
  //   }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData.username);
    this.userService.createUser(userData);
    return {};
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    console.log(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return this.userService.fetchUserById(id);
  }

  @Get('/:id/:postId')
  getUseraAndPostById(
    @Param('id') id: string,
    @Param('postId') postId: string,
  ) {
    console.log(id, postId);
    return { id, postId };
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'how',
        email: 'areyou',
        posts: [{ title: 'post' }, { title: 'post2' }],
      },
    ];
  }

  @Get('posts/comments')
  getUserPostsComments() {
    return [
      {
        id: 1,
        title: 'posts',
        comments: ['comment'],
      },
    ];
  }
}
