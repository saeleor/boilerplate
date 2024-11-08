import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { add } from '@boilerplate/example'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  console.log('1 + 2 = ', add(1, 2))
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
