import { Module } from '@nestjs/common';
import { CryptoAssetService } from './crypto-asset.service';
import { CryptoAssetController } from './crypto-asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CryptoAsset } from './entities/crypto-asset.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CryptoAssetController],
  providers: [CryptoAssetService, UserService],
  imports: [TypeOrmModule.forFeature([User, CryptoAsset])],
  exports: [TypeOrmModule.forFeature([CryptoAsset]), CryptoAssetService],
})
export class CryptoAssetModule {}
