import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { PaginatedDataDto } from 'src/common/dtos/paginated-data.dto';
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';
import { UserDto } from 'src/modules/users/application/dtos/user.dto';

import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';

import { PrismaService } from 'src/common/modules/prisma/services/prisma.service';

import { IUsersRepository } from 'src/modules/users/domain/repositories/users.repository.interface';

export class UsersPrismaRepositoryImpl implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAllPaginated({
    page,
    limit,
  }: PaginateDto): Promise<PaginatedDataDto<UserDto>> {
    const itemsPerPage = Math.max(Math.min(limit, 100), 1);
    const currentPage = Math.max(page, 1);

    const skip = (currentPage - 1) * itemsPerPage;

    const users = await this.prismaService.user.findMany({
      skip,
      take: itemsPerPage,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const data = users.map((user) => UserMapper.fromPrismaModel(user));
    const totalCount = await this.prismaService.user.count();

    return {
      data,
      totalCount,
    };
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany();
    const data = users.map((user) => UserMapper.fromPrismaModel(user));

    return data;
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    const data = UserMapper.fromPrismaModel(user);

    return data;
  }

  public async findById(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    const data = user ? UserMapper.fromPrismaModel(user) : null;

    return data;
  }

  public async findByEmail(email: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    const data = user ? UserMapper.fromPrismaModel(user) : null;

    return data;
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    const data = user ? UserMapper.fromPrismaModel(user) : null;

    return data;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
