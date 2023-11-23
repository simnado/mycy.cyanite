import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { CyaniteApiClient } from '@narendev/cyanite-sdk';
import { config } from 'dotenv';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    const api = new CyaniteApiClient();
    return api.getLibrary();
  }
}

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [],
})
export class AppModule {}

async function bootstrap() {
  await config({export: true});

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(3009);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  bootstrap();
}
