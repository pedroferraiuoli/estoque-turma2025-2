import ProductOrder from "../entities/ProductOrder";
import Product from "../entities/Product";
import type { ProductOrderRepositoryInterface } from "../repositories/ProductOrderRepository";

export class CreateProductOrderUsecase {

    private productOrderRepository: ProductOrderRepositoryInterface;

    constructor(productOrderRepository: ProductOrderRepositoryInterface) {
        this.productOrderRepository = productOrderRepository;
    }

    public execute(product: Product, quantity: number, orderDate: Date): ProductOrder | Error {
        try {
            const newProductOrder = ProductOrder.create(product, quantity, orderDate);
            if (newProductOrder instanceof Error) {
                return new Error(newProductOrder.message);
            }

            this.productOrderRepository.save(newProductOrder);
            return newProductOrder;
        } catch (error) {
            return new Error("Error creating product order");
        }
    }
}
