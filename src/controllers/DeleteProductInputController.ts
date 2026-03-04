import type { FastifyRequest, FastifyReply } from "fastify";
import Database from "better-sqlite3";


export class DeleteProductInputController {
    public async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const { productInputId } = request.params as { productInputId: string };

        if (!productInputId) {
            return response.status(400).send({ error: "Product input ID is required" });
        }
        
        try {
            const connection = new Database("db/estoque.db");

            const getProductInputStatement = connection.prepare("SELECT * FROM productInput WHERE uuid = ?");
            const productInput = getProductInputStatement.get(productInputId) as { uuid: string; productOrder_fk: string; quantity: number; inputDate: string } | undefined;
            if (!productInput) {
                return response.status(404).send({ error: "Product input not found" });
            }
            const getProductOrderStatement = connection.prepare("SELECT * FROM productOrder WHERE uuid = ?");
            const productOrder = getProductOrderStatement.get(productInput.productOrder_fk) as { uuid: string; product_fk: string; quantity: number; orderDate: string, status: string } | undefined;
            if (!productOrder) {
                return response.status(404).send({ error: "Product order not found" });
            }

            const getProductStatement = connection.prepare("SELECT * FROM products WHERE barcode = ?");
            const product = getProductStatement.get(productOrder.product_fk) as { barcode: string; name: string; quantity_in_stock: number } | undefined;
            if (!product) {
                return response.status(404).send({ error: "Product not found" });
            }

            if (product.quantity_in_stock < productInput.quantity) {
                return response.status(400).send({ error: "Cannot delete product input as it would result in negative stock" });
            }

            const deleteStatement = connection.prepare("DELETE FROM productInput WHERE uuid = ?");
            deleteStatement.run(productInputId);

            const updateProductOrderStatement = connection.prepare("UPDATE productOrder SET status = ? WHERE uuid = ?");
            updateProductOrderStatement.run("opened", productOrder.uuid);

            const newStock = product.quantity_in_stock - productInput.quantity;

            const updateProductStatement = connection.prepare("UPDATE products SET quantity_in_stock = ? WHERE barcode = ?");
            updateProductStatement.run(newStock, productOrder.product_fk);

            return response.status(200).send({ 
                message: "Product input deleted successfully",
             });

        } catch (error) {
            return response.status(500).send({ error: "Internal server error" });
        }
    }
}