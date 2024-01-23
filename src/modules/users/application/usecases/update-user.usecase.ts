import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

import { UsersService } from 'src/modules/users/application/services/users.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
