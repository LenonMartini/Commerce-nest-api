import { Product } from 'src/products/entities/product.entity';
import { Column, CreateDateColumn, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum OrderStatus{
    PENDING = 'pending',
    PAID = 'paid',
    FAILD = 'failed'
}

export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    total: number;
    @Column()
    client_id: number;
    @Column()
    status: OrderStatus = OrderStatus.PENDING;
    @CreateDateColumn()
    created_at: Date;
}

export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'int'})
    quantity: number;
    @Column()
    price: number;

    @ManyToMany(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
    
    @Column()
    product_id: string;

    @ManyToMany(() => Order)
    order: Order;

}
/*Parado em 1:12:05*/