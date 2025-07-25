import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna disponível em toda a aplicação
    }),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Product],
        synchronize: true,
        logging: true
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
