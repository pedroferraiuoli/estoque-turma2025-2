import Product from "../entities/Product";
import type { ProductRepositoryInterface } from "../repositories/ProductRepository";

export class GetProductUsecase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    public execute(barcode: string): Product | Error {
        try {
            const product = this.productRepository.findByBarcode(barcode);
            if (!product) {
                return new Error("Product not found");
            }
            return product;
        } catch (error) {
            return new Error("Error retrieving product");
        }
    }
}
