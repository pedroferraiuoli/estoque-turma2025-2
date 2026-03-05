import { randomUUID } from 'crypto';
import Product from './Product';
import type ProductOrder from './ProductOrder';

export default class ProductOutput {
    private uuid: string;
    private product: Product;
    private quantity: number;
    private outputDate: Date;

    private constructor(uuid: string, product: Product, quantity: number, outputDate: Date) {
        this.uuid = uuid;
        this.product = product;
        this.quantity = quantity;
        this.outputDate = outputDate;
    }

    public static create(product: Product, quantity: number, outputDate: Date): ProductOutput | Error {
        if (!product || !(product instanceof Product)) {
            return new Error("Product cannot be null or invalid");
        }
        if (quantity <= 0) {
            return new Error("Quantity must be positive");
        }
        if (!outputDate) {
            return new Error("Output date is required");
        }
        if (isNaN(outputDate.getTime())) {
            return new Error("Output date must be valid");
        }

        const uuid = randomUUID();
        return new ProductOutput(uuid, product, quantity, outputDate);
    }

    public static rebuild(uuid: string, product: Product, quantity: number, outputDate: Date): ProductOutput {
        return new ProductOutput(uuid, product, quantity, outputDate);
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

    public getOutputDate(): Date {
        return this.outputDate;
    }
}