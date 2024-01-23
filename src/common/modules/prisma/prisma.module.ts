import { Global, Module } from '@nestjs/common';

import { PrismaService } from 'src/common/modules/prisma/services/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
