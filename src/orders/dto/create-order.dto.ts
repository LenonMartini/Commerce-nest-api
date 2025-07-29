import { OrdemItemDto } from "./order-item.dto";

export class CreateOrderDto {
    items: OrdemItemDto[];
    card_bash: string;
}


