import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginInput, RegisterInput } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
  @UseGuards(AuthGuard)
  @Get('me')
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
