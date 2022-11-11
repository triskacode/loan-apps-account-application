import { Test, TestingModule } from '@nestjs/testing';
import { AccountHttpController } from './account.http.controller';

describe('AccountHttpController', () => {
  let controller: AccountHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountHttpController],
    }).compile();

    controller = module.get<AccountHttpController>(AccountHttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
