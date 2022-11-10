import { Test, TestingModule } from '@nestjs/testing';
import { AccountMicroserviceController } from './account.microservice.controller';

describe('AccountMicroserviceController', () => {
  let controller: AccountMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountMicroserviceController],
    }).compile();

    controller = module.get<AccountMicroserviceController>(
      AccountMicroserviceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
