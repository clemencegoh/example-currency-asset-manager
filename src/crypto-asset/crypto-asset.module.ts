import { Module } from '@nestjs/common';
import { CryptoAssetService } from './crypto-asset.service';
import { CryptoAssetController } from './crypto-asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CryptoAsset } from './entities/crypto-asset.entity';

@Module({
  controllers: [CryptoAssetController],
  providers: [CryptoAssetService],
  imports: [TypeOrmModule.forFeature([User, CryptoAsset])],
  exports: [TypeOrmModule],
})
export class CryptoAssetModule {}
