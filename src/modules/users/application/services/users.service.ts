import { Inject, Injectable } from '@nestjs/common';

import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { PaginatedDataDto } from 'src/common/dtos/paginated-data.dto';
import { UserDto } from 'src/modules/users/application/dtos/user.dto';

import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

import { USERS_REPOSITORY_TOKEN } from 'src/modules/users/infrastructure/repositories/users.repository';

import { IUsersRepository } from 'src/modules/users/domain/repositories/users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async findAll({
    page,
    limit,
  }: PaginateDto): Promise<PaginatedDataDto<UserDto>> {
    if (page && limit) {
      return this.usersRepository.findAllPaginated({ page, limit });
    }

    const data = await this.usersRepository.findAll();

    return {
      data,
    };
  }

  public async findById(id: string): Promise<UserDto> {
    const userAlreadyExist = await this.usersRepository.findById(id);

    if (!userAlreadyExist) {
      throw new Error();
    }

    return userAlreadyExist;
  }

  public async findByEmail(email: string): Promise<UserDto> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExist) {
      throw new Error();
    }

    return userAlreadyExist;
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userAlreadyExist = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (userAlreadyExist) {
      throw new Error();
    }

    return this.usersRepository.create(createUserDto);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const userAlreadyExist = await this.usersRepository.findById(id);

    if (userAlreadyExist) {
      throw new Error();
    }

    return this.usersRepository.update(userAlreadyExist.id, updateUserDto);
  }

  public async delete(id: string): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findById(id);

    if (!userAlreadyExist) {
      throw new Error();
    }

    await this.usersRepository.delete(userAlreadyExist.id);
  }
}
