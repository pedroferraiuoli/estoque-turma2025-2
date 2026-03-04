import type { FastifyRequest, FastifyReply } from "fastify";
import Database from "better-sqlite3";


export class DeleteProductOutputController {
    public async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const { productOutputId } = request.params as { productOutputId: string };

        if (!productOutputId) {
            return response.status(400).send({ error: "Product output ID is required" });
        }
        
        try {
            const connection = new Database("db/estoque.db");

            const getProductOutputStatement = connection.prepare("SELECT * FROM productOutput WHERE uuid = ?");
            const productOutput = getProductOutputStatement.get(productOutputId) as { uuid: string; product_fk: string, quantity: number, outputDate: string } | undefined;
            if (!productOutput) {
                return response.status(404).send({ error: "Product output not found" });
            }

            const getProductStatement = connection.prepare("SELECT * FROM products WHERE barcode = ?");
            const product = getProductStatement.get(productOutput.product_fk) as { barcode: string; name: string; quantity_in_stock: number } | undefined;
            if (!product) {
                return response.status(404).send({ error: "Product not found" });
            }

            const deleteStatement = connection.prepare("DELETE FROM productOutput WHERE uuid = ?");
            deleteStatement.run(productOutputId);


            const newStock = product.quantity_in_stock + productOutput.quantity;

            const updateProductStatement = connection.prepare("UPDATE products SET quantity_in_stock = ? WHERE barcode = ?");
            updateProductStatement.run(newStock, product.barcode);

            return response.status(200).send({ 
                message: "Product output deleted successfully",
             });

        } catch (error) {
            return response.status(500).send({ error: "Internal server error" });
        }
    }
}