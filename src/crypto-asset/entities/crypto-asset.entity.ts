import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genAssetUid } from '../utils/uid_generator';

@Entity()
@ObjectType()
export class CryptoAsset {
  @PrimaryColumn()
  id: string;

  @Column()
  assetName: string; // long asset name

  @Column()
  assetCode: string; // short asset code

  @Column()
  amount: string;

  @ManyToOne(() => User, (user) => user.assets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  beforeInsert() {
    this.id = genAssetUid(
      this.user.id,
      this.assetName.toLowerCase(),
      this.assetCode.toLowerCase(),
    );
  }

  public constructor(init?: Partial<CryptoAsset>) {
    Object.assign(this, init);
  }
}
