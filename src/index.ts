import Product from "./entities/Product.js";
import readlineSync from "readline-sync";
import { SqliteConnection } from "./repositories/SqliteConnection.js";
import { ProductRepository } from "./repositories/ProductRepository.js";

const sqliteConnection = new SqliteConnection("estoque.db");
const productRepository = new ProductRepository(sqliteConnection);

let barcode: string = readlineSync.question("Enter product barcode: ");

const product = productRepository.findByBarcode(barcode);

if (product instanceof Product) {
    console.log("Product exist:");
    console.log("Barcode:", product.getBarcode());
    console.log("Name:", product.getName());
    console.log("Quantity in Stock:", product.getQuantityInStock());
    console.log("Order Reference Days:", product.getOrderReferenceDays());
} else {
    console.log("Product with barcode", barcode, "not found.");
}
