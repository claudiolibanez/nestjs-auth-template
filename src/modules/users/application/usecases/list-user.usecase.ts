import { Injectable } from '@nestjs/common';

import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { UserDto } from 'src/modules/users/application/dtos/user.dto';
import { PaginatedDataDto } from 'src/common/dtos/paginated-data.dto';

import { UsersService } from 'src/modules/users/application/services/users.service';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(
    paginateDto: PaginateDto,
  ): Promise<PaginatedDataDto<UserDto>> {
    return this.usersService.findAll(paginateDto);
  }
}
