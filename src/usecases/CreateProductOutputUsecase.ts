import ProductOutput from "../entities/ProductOutput";
import type { ProductOutputRepositoryInterface } from "../repositories/ProductOutputRepository";
import type { ProductRepositoryInterface } from "../repositories/ProductRepository";

export interface CreateProductOutputUsecaseInterface {   
    execute(barcode: string, quantity: number, outputDate: Date): ProductOutput | Error;
}

export class CreateProductOutputUsecase implements CreateProductOutputUsecaseInterface {

    private productOutputRepository: ProductOutputRepositoryInterface;
    private productRepository: ProductRepositoryInterface;

    constructor(productOutputRepository: ProductOutputRepositoryInterface, productRepository: ProductRepositoryInterface) {
        this.productOutputRepository = productOutputRepository;
        this.productRepository = productRepository;
    }

    public execute(barcode: string, quantity: number, outputDate: Date): ProductOutput | Error {
        try {
            const product = this.productRepository.findByBarcode(barcode);
            if (!product) {
                return new Error("Product not found");
            }

            const stock = product.getQuantityInStock();
            
            if (quantity > stock) {
                return new Error("Insufficient stock for the requested output quantity");
            }

            const newProductOutput = ProductOutput.create(product, quantity, outputDate);
            if (newProductOutput instanceof Error) {
                return new Error(newProductOutput.message);
            }

            const newStock = stock - quantity;
            
            this.productOutputRepository.save(newProductOutput);
            
            this.productRepository.updateStock(barcode, newStock);

            return newProductOutput;

        } catch (error) {
            return new Error("Error creating product output");
        }
    }
}
