import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('findAll', () => {
    it('should return the appServices getHello() string', () => {
      const result = 'HellWorld';
      jest.spyOn(appService, 'getHello').mockImplementation(() => {
        return result;
      });

      expect(appController.getHello()).toBe(result);
    });
  });
});
