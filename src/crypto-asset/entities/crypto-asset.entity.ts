import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class CryptoAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  assetName: string; // long asset name

  @Column()
  assetCode: string; // short asset code

  @Column()
  amount: string;

  @ManyToOne(() => User, (user) => user.assets, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
