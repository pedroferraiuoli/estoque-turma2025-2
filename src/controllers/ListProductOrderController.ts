import type { FastifyReply, FastifyRequest } from "fastify";
import type { ListProductOrdersUsecase } from "../usecases/ListProductOrdersUsecase";

export class ListProductOrderController {
  private listProductOrdersUsecase: ListProductOrdersUsecase;

  constructor(listProductOrdersUsecase: ListProductOrdersUsecase) {
    this.listProductOrdersUsecase = listProductOrdersUsecase;
  }

  public async handle(
    request: FastifyRequest,
    response: FastifyReply
  ): Promise<FastifyReply> {
    const result = this.listProductOrdersUsecase.execute();

    if (result instanceof Error) {
      return response.status(400).send({ message: result.message });
    }

    const orders = Array.isArray(result) ? result : [];

    return response.status(200).send(
      orders.map((o) => ({
        uuid: o.getUuid(),
        product: o.getProduct().getName(),
        quantity: o.getQuantity(),
        orderDate: o.getOrderDate(),
        status: o.getStatus(),
      }))
    );
  }
}
