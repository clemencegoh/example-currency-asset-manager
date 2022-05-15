import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
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
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  @OneToMany(() => CryptoAsset, (cryptoAsset) => cryptoAsset.user)
  assets: CryptoAsset[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
