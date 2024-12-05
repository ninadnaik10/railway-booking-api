import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginInput, RegisterInput } from './types';
import { AdminGuard } from './guards/admin.guard';
import { UserRole } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: LoginInput) {
    return this.authService.authenticate(input);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() input: RegisterInput) {
    console.log(input);
    return this.authService.register(input);
  }

  @UseGuards(AdminGuard)
  @Post('create-admin')
  async addAdmin(@Body() input: RegisterInput) {
    return this.authService.register(input, true);
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async getUserInfo(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('admin/get-api-key')
  async getApiKey(@Request() req) {
    console.log(req.user);
    try {
      const user = await this.usersService.findOneById(req.user.id);

      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException();
      }
      return process.env.API_KEY;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
