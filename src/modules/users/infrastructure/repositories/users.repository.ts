import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DataSource } from 'src/common/constants/datasource.constant';

import { Env } from 'src/config/env.config';

import { PrismaService } from 'src/common/modules/prisma/services/prisma.service';

import { UsersInMemoryRepositoryImpl } from 'src/modules/users/infrastructure/repositories/implementations/users-in-memory-repository.implementation';
import { UsersPrismaRepositoryImpl } from 'src/modules/users/infrastructure/repositories/implementations/users-prisma-repository.implementation';

export const USERS_REPOSITORY_TOKEN = 'users-repository-token';

export function provideUsersRepository(): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: UsersRepositoryDependenciesProvider,
      ) => provideUsersRepositoryFactory(dependenciesProvider),
      inject: [UsersRepositoryDependenciesProvider],
    },
    UsersRepositoryDependenciesProvider,
  ];
}

async function provideUsersRepositoryFactory(
  dependenciesProvider: UsersRepositoryDependenciesProvider,
) {
  switch (dependenciesProvider.datasource) {
    // case DataSource.TYPEORM:
    //   return new UsersTypeOrmRepositoryImpl(
    //     dependenciesProvider.typeOrmRepository,
    //   );
    case DataSource.PRISMA:
      return new UsersPrismaRepositoryImpl(dependenciesProvider.prismaService);
    case DataSource.MEMORY:
    default:
      return new UsersInMemoryRepositoryImpl();
  }
}

@Injectable()
export class UsersRepositoryDependenciesProvider {
  public readonly datasource: string;

  constructor(
    private readonly configService: ConfigService<Env, true>,
    public readonly prismaService: PrismaService,
  ) {
    this.datasource = this.configService.getOrThrow<string>('DATASOURCE');
  }
}
