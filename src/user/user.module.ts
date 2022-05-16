import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CryptoAsset } from 'src/crypto-asset/entities/crypto-asset.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, CryptoAsset])],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
