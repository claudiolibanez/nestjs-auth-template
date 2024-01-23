import { UserDto } from 'src/modules/users/application/dtos/user.dto';
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

import { IRepository } from 'src/common/repositories/repository.interface';

export interface IUsersRepository
  extends IRepository<UserDto, CreateUserDto, UpdateUserDto> {}
