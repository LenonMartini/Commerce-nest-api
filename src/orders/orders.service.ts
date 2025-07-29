import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ){}

  async create(createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map(item => item.product_id);
    const uniqueProductIds = [...new Set(productIds)];

    const products = await this.productRepo.findBy({ 
      id: In(uniqueProductIds),
    });

    if(products.length !== uniqueProductIds.length){
      throw new Error(`Algum produto não existe. Produtos passados ${productIds}, produtos encontrados ${products.map(product => product.id)}`);
    }
    const items = createOrderDto.items.map((item) => {
      const product = products.find(
        (product) => product.id === item.product_id,
      );
      return {

        price: product.price,
        product_id: item.product_id,
        quantity: item.quantity,
       
      };
    });
    

    const order = Order.create({
      client_id: 1,
      items
     
    });
   
    await this.orderRepo.save(order);
    
    return order;
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: number) {
    return `Parado 11:34:09`;
  }


}
