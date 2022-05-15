import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    // require instantiate before save to trigger beforeInsert
    const newUser = new User(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.userRepository.delete({ id: id });
  }

  async findByName(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ name: name });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ username: username });
    return user;
  }
}
