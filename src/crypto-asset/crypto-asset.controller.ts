import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CryptoAssetService } from './crypto-asset.service';
import { CreateCryptoAssetDto } from './dto/create-crypto-asset.dto';
import { UpdateCryptoAssetDto } from './dto/update-crypto-asset.dto';

@ApiTags('Assets')
@UseGuards(JwtAuthGuard)
@Controller('crypto-asset')
export class CryptoAssetController {
  constructor(private readonly cryptoAssetService: CryptoAssetService) {}

  @Post()
  create(@Body() createCryptoAssetDto: CreateCryptoAssetDto) {
    return this.cryptoAssetService.create(createCryptoAssetDto);
  }

  @Get()
  findAll() {
    return this.cryptoAssetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoAssetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCryptoAssetDto: UpdateCryptoAssetDto,
  ) {
    return this.cryptoAssetService.update(+id, updateCryptoAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoAssetService.remove(+id);
  }
}
