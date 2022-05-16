import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAllOrByUsername(@Query('username') username: string) {
    if (!username || username === '') {
      return this.userService.findAll();
    }
    return this.userService.findByUsername(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/assets')
  findAllAssetsForUser(@Param('id') id: string, @Query('code') code: string) {
    if (code && code !== '') {
      return this.userService.findSpecificAssetForUser(id, code);
    }
    return this.userService.findAssetsForUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete()
  async implode() {
    const allUsers = await this.userService.findAll();
    for (const users of allUsers) {
      this.userService.remove(users.id);
    }
  }
}
