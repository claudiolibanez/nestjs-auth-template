import { Module } from '@nestjs/common';

import { provideUsersRepository } from 'src/modules/users/infrastructure/repositories/users.repository';

import { UsersService } from 'src/modules/users/application/services/users.service';

import { ListUsersUseCase } from 'src/modules/users/application/usecases/list-user.usecase';
import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';
import { ShowUserUseCase } from 'src/modules/users/application/usecases/show-user.usecase';
import { UpdateUserUseCase } from 'src/modules/users/application/usecases/update-user.usecase';
import { DeleteUserUseCase } from 'src/modules/users/application/usecases/delete-user.usecase';

import { UsersController } from 'src/modules/users/infrastructure/http/controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    // repositories
    ...provideUsersRepository(),

    // services
    UsersService,

    // usecases
    ListUsersUseCase,
    CreateUserUseCase,
    ShowUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UsersService],
})
export class UsersModule {}
