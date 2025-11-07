export class Product {
    private barcode: string;
    private name: string;
    private quantityInStock: number;
    private orderReferenceDays: number;

    private constructor(barcode: string, name: string, quantityInStock: number, orderReferenceDays: number) {
        this.barcode = barcode;
        this.name = name;
        this.quantityInStock = quantityInStock;
        this.orderReferenceDays = orderReferenceDays;
    }

    public static create(barcode: string, name: string, orderReferenceDays: number): Product | Error {
        if (barcode.length === 0) {
            return new Error("Barcode cannot be empty");
        }
        if (name.length === 0) {
            return new Error("Name cannot be empty");
        }
        if (orderReferenceDays <= 0) {
            return new Error("Order reference days can be positive");
        }

        const initialStock = 0;
        return new Product(barcode, name, initialStock, orderReferenceDays);
    }

    public getBarcode(): string {
        return this.barcode;
    }

    public getName(): string {
        return this.name;
    }

    public getQuantityInStock(): number {
        return this.quantityInStock;
    }

    public getOrderReferenceDays(): number {
        return this.orderReferenceDays;
    }

}