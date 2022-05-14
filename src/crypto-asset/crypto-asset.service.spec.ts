import { Test, TestingModule } from '@nestjs/testing';
import { CryptoAssetService } from './crypto-asset.service';

describe('CryptoAssetService', () => {
  let service: CryptoAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoAssetService],
    }).compile();

    service = module.get<CryptoAssetService>(CryptoAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
