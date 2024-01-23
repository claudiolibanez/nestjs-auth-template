import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response as ExpressResponse } from 'express';

import { UserDto } from 'src/modules/users/application/dtos/user.dto';
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';
import { DeleteUserUseCase } from 'src/modules/users/application/usecases/delete-user.usecase';
import { ListUsersUseCase } from 'src/modules/users/application/usecases/list-user.usecase';
import { ShowUserUseCase } from 'src/modules/users/application/usecases/show-user.usecase';
import { UpdateUserUseCase } from 'src/modules/users/application/usecases/update-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async index(
    @Query('page') page,
    @Query('limit') limit,
    @Response() response: ExpressResponse,
  ) {
    const { data, totalCount } = await this.listUsersUseCase.execute({
      page,
      limit,
    });

    response.setHeader('X-Total-Count', totalCount);

    const users = plainToInstance(
      UserDto,
      data.map((user) => ({
        ...user,
      })),
    );

    return response.json(users);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async store(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.createUserUseCase.execute(createUserDto);

    return plainToInstance(UserDto, {
      ...user,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async show(@Param('id') id: string): Promise<UserDto> {
    const user = await this.showUserUseCase.execute(id);

    return plainToInstance(UserDto, {
      ...user,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.updateUserUseCase.execute(id, updateUserDto);

    return plainToInstance(UserDto, {
      ...user,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
