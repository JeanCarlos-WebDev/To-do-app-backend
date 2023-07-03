import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
// import { JwtModule } from '@nestjs/jwt';
// import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}) ,TasksModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
