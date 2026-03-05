import type { FastifyRequest, FastifyReply } from "fastify";
import type { CreateProductOutputUsecase } from "../usecases/CreateProductOutputUsecase";


export class CreateProductOutputController {

    private createProductOutputUsecase: CreateProductOutputUsecase;

    constructor(createProductOutputUsecase: CreateProductOutputUsecase) {
        this.createProductOutputUsecase = createProductOutputUsecase;
    }

    public async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const { barcode, quantity, outputDate } = request.body as { barcode: string; quantity: number; outputDate: string; };
            
        const result = this.createProductOutputUsecase.execute(barcode, quantity, new Date(outputDate));

        if (result instanceof Error) {
            console.log("Error creating product output:", result);
            return response.status(400).send({ error: result.message });
        }

        return response.status(201).send({ 
            productOutputId: result.getUuid(),
            productOutputQuantity: quantity,
            productOutputDate: result.getOutputDate().toISOString(),
            productBarcode: result.getProduct().getBarcode(),
            productName: result.getProduct().getName(),
            productStock: result.getProduct().getQuantityInStock()
            });
    }
}