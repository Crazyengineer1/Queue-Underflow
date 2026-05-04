import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg"
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
        super({ adapter });
    }
    async onModuleInit() {
        try {
            await this.$connect();
            console.log("DB Connected");
        } catch (error) {
            console.error("DB Connection Failed", error);
        }
    }
}