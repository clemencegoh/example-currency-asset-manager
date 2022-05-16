import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCryptoAssetDto } from './dto/create-crypto-asset.dto';
import { UpdateCryptoAssetDto } from './dto/update-crypto-asset.dto';
import { CryptoAsset } from './entities/crypto-asset.entity';
import { genAssetUid } from './utils/uid_generator';

@Injectable()
export class CryptoAssetService {
  constructor(
    @InjectRepository(CryptoAsset)
    private cryptoAssetRepository: Repository<CryptoAsset>,
    private userService: UserService,
  ) {}

  async createAssetForUser(
    userid: string,
    createCryptoAssetDto: CreateCryptoAssetDto,
  ): Promise<CryptoAsset> {
    const user = await this.userService.findOne(userid);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const newAsset = await this.createAsset(user, createCryptoAssetDto);
    await this.userService.addNewAsset(user.id, newAsset);
    return newAsset;
  }

  async createAsset(
    user: User,
    createCryptoAssetDto: CreateCryptoAssetDto,
  ): Promise<CryptoAsset> {
    const assetId = genAssetUid(
      user.id,
      createCryptoAssetDto.assetName,
      createCryptoAssetDto.assetCode,
    );
    const matchingAsset = await this.cryptoAssetRepository.findOne(assetId);
    if (matchingAsset) {
      throw new HttpException(
        'Asset already exists for user',
        HttpStatus.CONFLICT,
      );
    }

    const asset = new CryptoAsset({
      ...createCryptoAssetDto,
      user: user,
    });
    return this.cryptoAssetRepository.save(asset);
  }

  findAll() {
    return this.cryptoAssetRepository.find();
  }

  findOne(id: string) {
    return this.cryptoAssetRepository.findOne(id);
  }

  async update(id: string, updateCryptoAssetDto: UpdateCryptoAssetDto) {
    const asset = await this.findOne(id);
    asset.amount = updateCryptoAssetDto.amount;
    this.cryptoAssetRepository.save(asset);
  }

  async updateForUser(
    userid: string,
    updateCryptoAssetDto: UpdateCryptoAssetDto,
  ) {
    // this is implementation-specific and may need to be changed
    const uid = genAssetUid(
      userid,
      updateCryptoAssetDto.assetName,
      updateCryptoAssetDto.assetCode,
    );
    return this.update(uid, updateCryptoAssetDto);
  }

  async remove(id: string) {
    return this.cryptoAssetRepository.delete(id);
  }

  async deleteAll() {
    const allAssets = await this.cryptoAssetRepository.find();
    allAssets.forEach((asset) => {
      this.cryptoAssetRepository.delete(asset);
    });
  }
}
