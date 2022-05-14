import { Test, TestingModule } from '@nestjs/testing';
import { CryptoAssetController } from './crypto-asset.controller';
import { CryptoAssetService } from './crypto-asset.service';

describe('CryptoAssetController', () => {
  let controller: CryptoAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoAssetController],
      providers: [CryptoAssetService],
    }).compile();

    controller = module.get<CryptoAssetController>(CryptoAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
