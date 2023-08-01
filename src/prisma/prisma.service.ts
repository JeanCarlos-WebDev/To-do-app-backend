import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
                
        })
    }
    async cleanDB() {
        await this.categories.deleteMany();
        await this.tasks.deleteMany()
        await this.users.deleteMany();
        console.log('Database cleaned sucessfuly')
    }
}
