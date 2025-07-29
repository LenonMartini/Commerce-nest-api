
import { Product } from 'src/products/entities/product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
export enum OrderStatus{
    PENDING = 'pending',
    PAID = 'paid',
    FAILD = 'failed'
}
export type CreateOrderCommand = {
    client_id: number,
    items: {
        product_id: string,
        quantity: number,
        price: number
    }[]
}
@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    total: number;

    @Column()
    client_id: number;

    @Column()
    status: OrderStatus = OrderStatus.PENDING;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: ['insert'] })
    items: OrderItem[];

    // Utilizado para calcular o total
    static create(input: CreateOrderCommand){

        const order = new Order();
        order.client_id = input.client_id;
        order.items = input.items.map(item => {
            const orderItem = new OrderItem();

            orderItem.product_id = item.product_id;
            orderItem.quantity = item.quantity;
            orderItem.price = item.price;

            return orderItem;
        });
        order.total = order.items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);


       
        return order;
    }
}


