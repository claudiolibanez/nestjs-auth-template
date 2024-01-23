import { Injectable } from '@nestjs/common';

import { UserDto } from 'src/modules/users/application/dtos/user.dto';
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';

import { UsersService } from 'src/modules/users/application/services/users.service';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }
}
