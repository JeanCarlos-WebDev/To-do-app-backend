import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private prisma: PrismaService) { }

  
  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signup(createAuthDto);
  }

  @HttpCode(200)
  @Post('signin')
  async singin(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signin(createAuthDto)
  }

}
