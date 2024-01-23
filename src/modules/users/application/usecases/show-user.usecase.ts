import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/modules/users/application/services/users.service';

@Injectable()
export class ShowUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(id: string) {
    return this.usersService.findById(id);
  }
}
