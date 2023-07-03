import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){}
  async signup(createAuthDto: CreateAuthDto) {
    try{
      const hash = await argon.hash(createAuthDto.password);
      const user  = await this.prisma.users.create({
        data: {
          email: createAuthDto.email, 
          hash,
        },
        select: {
          id: true,
          email: true
        }
      })
      const token = await this.jwt.signAsync(user, {secret: this.config.get('TOKEN_SECRET')})
      return token;
    }
    catch (err) {
      if (err?.name == "PrismaClientKnownRequestError") {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken')
        }
      }
    }
  }

  async signin(CreateAuthDto: CreateAuthDto) {
  const user = await this.prisma.users.findUnique({
      where: {
        email: CreateAuthDto.email
      }
    })
  const isPassword = await argon.verify(user.hash, CreateAuthDto.password)
  if (!isPassword) {
    throw new UnauthorizedException('Credentials are wrong')
  }
  delete user.hash 
  const token = await this.jwt.signAsync(user, {secret: this.config.get('TOKEN_SECRET')})
  return token
  }
}
