import Product from "../entities/Product";
import type { ProductRepositoryInterface } from "../repositories/ProductRepository";

export class GetProductUsecase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    public execute(barcode: string): Product | Error {
        const product = this.productRepository.findByBarcode(barcode);
        if (!product) {
            return new Error("Product not found");
        }
        return product;
    }
}
