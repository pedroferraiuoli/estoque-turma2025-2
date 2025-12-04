import { randomUUID } from 'crypto';
import Product from './Product';

export default class ProductOrder {
    private uuid: string;
    private product: Product;
    private quantity: number;
    private orderDate: Date;

    private constructor(uuid: string, product: Product, quantity: number, orderDate: Date) {
        this.uuid = uuid;
        this.product = product;
        this.quantity = quantity;
        this.orderDate = orderDate;
    }

    public static create(product: Product, quantity: number, orderDate: Date): ProductOrder | Error {
        if (!product || !(product instanceof Product)) {
            return new Error("Product cannot be null or invalid");
        }
        if (quantity <= 0) {
            return new Error("Quantity must be positive");
        }
        if (isNaN(orderDate.getTime())) {
            return new Error("Order date must be valid");
        }

        const uuid = randomUUID();
        return new ProductOrder(uuid, product, quantity, orderDate);
    }

// GenerateUuid deve ser feito aqui ou no banco?

    public static rebuild(uuid: string, product: Product, quantity: number, orderDate: Date): ProductOrder {
        return new ProductOrder(uuid, product, quantity, orderDate);
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getProduct(): Product {
        return this.product;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getOrderDate(): Date {
        return this.orderDate;
    }
}