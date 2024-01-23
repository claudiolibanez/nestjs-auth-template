import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from 'src/app.module';

import { configureApp, bootstrap } from 'src/main';

describe('NestJS Main Functions', () => {
  let app: INestApplication;

  describe('Bootstrap Function', () => {
    it('should initialize the application and listen on a dynamic port', async () => {
      app = await bootstrap(0);

      expect(app).toBeDefined();

      await app.close();
    });
  });

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
