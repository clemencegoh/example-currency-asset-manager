import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDetails } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CryptoAssetService } from './crypto-asset.service';
import { CreateCryptoAssetDto } from './dto/create-crypto-asset.dto';
import { UpdateCryptoAssetDto } from './dto/update-crypto-asset.dto';

@ApiTags('Assets')
@Controller('crypto-assets')
export class CryptoAssetController {
  constructor(private readonly cryptoAssetService: CryptoAssetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCryptoAssetDto: CreateCryptoAssetDto, @Request() req) {
    return this.cryptoAssetService.createAssetForUser(
      (req.user as UserDetails).id,
      createCryptoAssetDto,
    );
  }

  @Get()
  findAll() {
    return this.cryptoAssetService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateCryptoAssetDto: UpdateCryptoAssetDto, @Request() req) {
    const user = req.user as UserDetails;
    return this.cryptoAssetService.updateForUser(user.id, updateCryptoAssetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoAssetService.remove(id);
  }

  // WARNING: this should ideally not exist at all if using in prod - only for testing
  @Delete('/all')
  implode() {
    return this.cryptoAssetService.deleteAll();
  }
}
