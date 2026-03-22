import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProductOrderRepositoryInterface } from "../repositories/ProductOrderRepository";

export class GetProductOrderController {
  constructor(private readonly productOrderRepository: ProductOrderRepositoryInterface) {}

  public async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
    const { productOrderId } = request.params as { productOrderId: string };

    const order = this.productOrderRepository.findByUuid(productOrderId);

    if (!order) {
      return response.status(404).send({ message: "Pedido não encontrado." });
    }

    return response.status(200).send({
      uuid: order.getUuid(),
      product: order.getProduct().getName(),
      productBarcode: order.getProduct().getBarcode(),
      quantity: order.getQuantity(),
      orderDate: order.getOrderDate(),
      status: order.getStatus(),
    });
  }
}
