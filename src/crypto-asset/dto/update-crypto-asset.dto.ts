import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoAssetDto } from './create-crypto-asset.dto';

export class UpdateCryptoAssetDto extends PartialType(CreateCryptoAssetDto) {}
