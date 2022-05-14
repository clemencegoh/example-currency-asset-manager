import { Injectable } from '@nestjs/common';
import { CreateCryptoAssetDto } from './dto/create-crypto-asset.dto';
import { UpdateCryptoAssetDto } from './dto/update-crypto-asset.dto';

@Injectable()
export class CryptoAssetService {
  create(createCryptoAssetDto: CreateCryptoAssetDto) {
    return 'This action adds a new cryptoAsset';
  }

  findAll() {
    return `This action returns all cryptoAsset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoAsset`;
  }

  update(id: number, updateCryptoAssetDto: UpdateCryptoAssetDto) {
    return `This action updates a #${id} cryptoAsset`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoAsset`;
  }
}
