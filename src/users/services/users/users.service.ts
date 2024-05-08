import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    {
      username: 'name',
      email: 'email@email.sk',
    },
    {
      username: 'ff',
      email: 'dd@email.sk',
    },
    {
      username: 'ffbbb',
      email: 'emafdfil@email.sk',
    },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return {};
  }

  fetchUserById(id: number) {
    return {
      id,
      username: 'rando',
      email: 'rando@rano.dk',
    };
  }
}
