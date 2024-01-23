import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from 'src/ioC/app.module';

import { configureApp } from 'src/main';

describe('NestJS Main Functions', () => {
  let app: INestApplication;

  describe('AppModule', () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = module.createNestApplication();

      configureApp(app);

      await app.init();
    });

    it('should be configure the application correctly', () => {
      const httpAdapter = app.getHttpAdapter();

      expect(httpAdapter).toBeDefined();
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
