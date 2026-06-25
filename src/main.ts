import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Enable CORS so the Frontend on port 3001 can talk to this Backend on port 3000
  app.enableCors();

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Chatbot Wizy API')
    .setDescription('API for communicating with the AI Customer Support Agent')
    .setVersion('1.0')
    .addTag('chatbot')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error(err);
});
