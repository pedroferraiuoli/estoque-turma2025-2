import ProductOrder from "../entities/ProductOrder";
import type { ProductOrderRepositoryInterface } from "../repositories/ProductOrderRepository";

export interface ListProductOrdersUsecaseInterface {
  execute(): ProductOrder[] | Error;
}

export class ListProductOrdersUsecase implements ListProductOrdersUsecaseInterface {
  private productOrderRepository: ProductOrderRepositoryInterface;

  constructor(productOrderRepository: ProductOrderRepositoryInterface) {
    this.productOrderRepository = productOrderRepository;
  }

  public execute(): ProductOrder[] | Error {
    try {
      return this.productOrderRepository.listAll();
    } catch (error) {
      return new Error("Error listing product orders");
    }
  }
}
