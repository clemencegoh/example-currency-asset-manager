import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CryptoAsset } from 'src/crypto-asset/entities/crypto-asset.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field({ nullable: true })
  username: string;

  @Column()
  @Field({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  @OneToMany(() => CryptoAsset, (cryptoAsset) => cryptoAsset.user)
  assets: CryptoAsset[];

  @BeforeInsert()
  async hashPassword?(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
