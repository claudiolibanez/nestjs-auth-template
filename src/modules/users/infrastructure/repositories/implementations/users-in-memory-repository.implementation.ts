import * as crypto from 'node:crypto';

import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { PaginatedDataDto } from 'src/common/dtos/paginated-data.dto';
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';
import { UserDto } from 'src/modules/users/application/dtos/user.dto';

import { IUsersRepository } from 'src/modules/users/domain/repositories/users.repository.interface';

export class UsersInMemoryRepositoryImpl implements IUsersRepository {
  private users: UserDto[] = [];

  public async findAllPaginated({
    page,
    limit,
  }: PaginateDto): Promise<PaginatedDataDto<UserDto>> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = this.users.slice(startIndex, endIndex);
    const totalCount = this.users.length;

    return {
      data,
      totalCount,
    };
  }

  public async findAll(): Promise<UserDto[]> {
    return this.users;
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user: UserDto = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createUserDto,
    };

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<UserDto> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<UserDto> {
    return this.users.find((user) => user.email === email);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return null;
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };

    return this.users[userIndex];
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    this.users.splice(userIndex, 1);
  }
}
