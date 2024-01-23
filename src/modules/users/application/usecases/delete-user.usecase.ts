import { Injectable } from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
