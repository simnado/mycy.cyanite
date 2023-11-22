import { Controller, Get, Module } from 'npm:@nestjs/common@10.2.10';
import { NestFactory } from 'npm:@nestjs/core@10.2.10';
import { NestExpressApplication } from 'npm:@nestjs/platform-express@10.2.10';
import { join } from 'node:path';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  bootstrap();
}
