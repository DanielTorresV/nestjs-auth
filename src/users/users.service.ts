import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 12);
    const newUser = {
      ...createUserDto,
      password: hash,
    };

    const data = await this.userRepository.save(newUser);

    return data;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if ('password' in updateUserDto) {
      const hash = await bcrypt.hash(updateUserDto.password, 12);
      const updateUser = {
        ...updateUserDto,
        password: hash,
      };

      const data = await this.userRepository.update(id, updateUser);

      return data;
    }
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
