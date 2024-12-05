import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from './types';
import { JwtService } from '@nestjs/jwt';

type SignInData = {
  userId: string;
  email: string;
};

type AuthResult = {
  accessToken: string;
  userId: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(input: LoginInput): Promise<SignInData | null> {
    const user = await this.usersService.findOne(input.email);
    if (user && (await bcrypt.compare(input.password, user.password))) {
      return { userId: user.id, email: user.email };
    }
    return null;
  }

  async authenticate(input: LoginInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signIn(user);
  }

  async register(input: RegisterInput, isAdmin = false): Promise<AuthResult> {
    const userId = await this.usersService.createUser(input, isAdmin);
    // const user = await this.usersService.findOne(input.email);
    return this.signIn({ userId, email: input.email });
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      userId: user.userId,
      username: user.email,
    };
    console.log('tp' + tokenPayload);
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return {
      accessToken,
      userId: user.userId,
      email: user.email,
    };
  }

  async registerAdmin(input: RegisterInput): Promise<AuthResult> {
    const userId = await this.usersService.createUser(input);
    return this.signIn({ userId, email: input.email });
  }
}
