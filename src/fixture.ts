import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true); // cuidado: isso apaga e recria tabelas se for true

  const productRepo = dataSource.getRepository(Product);

  await productRepo.insert([
    {
      id: '35caf540-82b0-45c0-8fe1-df601f2b7820',
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '7f85c1f2-129a-42e4-90bb-7e558f05934c',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 120,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: 'e26c6313-3d89-4b92-a2a3-bc951e1b9b66',
      name: 'Product 3',
      description: 'Product 3 description',
      price: 90,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '14e40dcb-d1e7-4de2-b3fb-1cc0a7d71f12',
      name: 'Product 4',
      description: 'Product 4 description',
      price: 150,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '8ad38588-5ff2-4ed9-84e6-530d7bb1d1b7',
      name: 'Product 5',
      description: 'Product 5 description',
      price: 110,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '66c88bd0-23c6-49fa-88c0-b54d2e17211c',
      name: 'Product 6',
      description: 'Product 6 description',
      price: 80,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '9f145d8a-5f85-4386-b632-b9c8e74d7f4e',
      name: 'Product 7',
      description: 'Product 7 description',
      price: 130,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '7e72c4fa-c08f-4f4f-a44c-9b1c2ac4f502',
      name: 'Product 8',
      description: 'Product 8 description',
      price: 105,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '3a70951a-2f8c-45ea-8f83-0d54d5b2a897',
      name: 'Product 9',
      description: 'Product 9 description',
      price: 99,
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '0eb96e88-0fa5-4b0a-963a-d12f63e1d0f4',
      name: 'Product 10',
      description: 'Product 10 description',
      price: 140,
      image_url: 'https://via.placeholder.com/150',
    },
  ]);

  await app.close();
}

bootstrap();
