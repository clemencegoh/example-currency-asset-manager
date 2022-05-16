import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CryptoAsset } from 'src/crypto-asset/entities/crypto-asset.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
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

  // eager so we can see this on the find() call
  @OneToMany(() => CryptoAsset, (cryptoAsset) => cryptoAsset.user, {
    cascade: true,
    eager: true,
  })
  assets: CryptoAsset[];

  addAsset(asset: CryptoAsset): User {
    if (this.assets == null) {
      this.assets = Array<CryptoAsset>();
    }
    this.assets.push(asset);
    return this;
  }

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
