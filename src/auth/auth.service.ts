import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // TODO: bcrypt
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      console.error(err);

      throw new ForbiddenException('Error during registration');
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
