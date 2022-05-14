import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CryptoAssetModule } from './crypto-asset/crypto-asset.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    CryptoAssetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
