import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { add } from '@boilerplate/example'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  console.log('add ', add(3, 4))

  const config = new DocumentBuilder()
    .setTitle('Boilerplate')
    .setDescription(
      `<p>Looking for the GraphQL API?</p>
      <p>Go to <a href="/graphql" target="_blank">/graphql</a>.</p>
      <p>Or use the <a href="http://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3001/graphql&document=query items{items {id  }}" target="_blank">Apollo explorer</a> for a better experience.`,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
