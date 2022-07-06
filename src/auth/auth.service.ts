import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(authLoginObject: LoginAuthDto) {
    const { email, password } = authLoginObject;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: user.id, name: user.name };
    const token = await this.jwtService.sign(payload);

    return { token };
  }
}
