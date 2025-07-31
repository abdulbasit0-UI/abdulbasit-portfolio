---
title: "How to Setup a Professional NestJS Project"
date: "2025-04-05"
description: "How I built a robust, distributed web scraper using Scrapy, Docker, and MongoDB for data ingestion."
---

# How to Setup a Professional NestJS Project

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. This guide will walk you through setting up a professional-grade NestJS project with best practices, proper structure, and essential tooling.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git for version control

## 1. Initial Project Setup

### Install NestJS CLI

The NestJS CLI provides powerful scaffolding capabilities and development tools.

```bash
npm install -g @nestjs/cli
```

### Create New Project

```bash
nest new my-professional-app
cd my-professional-app
```

Choose your preferred package manager when prompted (npm or yarn).

## 2. Project Structure Organization

A professional NestJS project should follow a clear, scalable structure:

```
src/
├── common/           # Shared utilities, decorators, filters
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/          # Configuration files
├── database/        # Database related files
│   ├── migrations/
│   └── seeds/
├── modules/         # Feature modules
│   ├── auth/
│   ├── users/
│   └── products/
├── shared/          # Shared modules and services
├── app.module.ts
└── main.ts
```

## 3. Essential Dependencies

Install production dependencies for a robust application:

```bash
# Core dependencies
npm install @nestjs/config @nestjs/typeorm typeorm pg
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install class-validator class-transformer
npm install helmet compression cors

# Development dependencies
npm install -D @types/passport-jwt @types/node
npm install -D eslint prettier @typescript-eslint/eslint-plugin
npm install -D @nestjs/testing jest ts-jest supertest
```

## 4. Configuration Management

Create a professional configuration system using environment variables.

### Environment Files

Create `.env`, `.env.development`, and `.env.production` files:

```env
# .env
NODE_ENV=development
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=myapp
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

### Configuration Module

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
```

## 5. Database Setup with TypeORM

Configure TypeORM for database operations:

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'development',
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## 6. Authentication & Authorization

Implement JWT-based authentication:

```typescript
// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

## 7. Global Error Handling

Create a global exception filter:

```typescript
// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

## 8. Validation and Transformation

Set up global validation pipes:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security
  app.use(helmet());
  app.use(compression());
  app.enableCors();
  
  // Global pipes and filters
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // API prefix
  app.setGlobalPrefix('api/v1');
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

## 9. Logging

Implement structured logging:

```typescript
// src/common/logger/logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log(JSON.stringify({
      level: 'info',
      message,
      context,
      timestamp: new Date().toISOString(),
    }));
  }

  error(message: string, trace?: string, context?: string) {
    console.error(JSON.stringify({
      level: 'error',
      message,
      trace,
      context,
      timestamp: new Date().toISOString(),
    }));
  }

  warn(message: string, context?: string) {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      context,
      timestamp: new Date().toISOString(),
    }));
  }

  debug(message: string, context?: string) {
    console.debug(JSON.stringify({
      level: 'debug',
      message,
      context,
      timestamp: new Date().toISOString(),
    }));
  }

  verbose(message: string, context?: string) {
    console.log(JSON.stringify({
      level: 'verbose',
      message,
      context,
      timestamp: new Date().toISOString(),
    }));
  }
}
```

## 10. Testing Setup

Configure comprehensive testing:

```typescript
// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## 11. Code Quality Tools

### ESLint Configuration

```json
{
  "extends": [
    "@nestjs/eslint-config"
  ],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

### Prettier Configuration

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80
}
```

## 12. Package.json Scripts

Add useful scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate": "npm run typeorm -- migration:generate",
    "migration:run": "npm run typeorm -- migration:run",
    "migration:revert": "npm run typeorm -- migration:revert"
  }
}
```

## 13. Docker Configuration

Create a `Dockerfile` for containerization:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
```

And a `docker-compose.yml` for development:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - postgres
    volumes:
      - .:/app
      - /app/node_modules

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 14. API Documentation

Add Swagger documentation:

```bash
npm install @nestjs/swagger swagger-ui-express
```

```typescript
// src/main.ts (add to bootstrap function)
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('My Professional API')
  .setDescription('API documentation for my professional NestJS application')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

## Best Practices Summary

1. **Modular Architecture**: Organize code into feature modules
2. **Environment Configuration**: Use environment variables for all configurations
3. **Database Migrations**: Always use migrations instead of synchronize in production
4. **Error Handling**: Implement global exception filters
5. **Validation**: Use DTOs with class-validator for request validation
6. **Security**: Implement authentication, authorization, and security headers
7. **Testing**: Write comprehensive unit and e2e tests
8. **Documentation**: Maintain up-to-date API documentation
9. **Code Quality**: Use ESLint, Prettier, and pre-commit hooks
10. **Logging**: Implement structured logging for better debugging

This setup provides a solid foundation for building scalable, maintainable, and professional NestJS applications. Each component can be customized based on your specific requirements and business needs.