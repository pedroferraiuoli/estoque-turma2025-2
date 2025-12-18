import Product from "./entities/Product";
import readlineSync from "readline-sync";
import { SqliteConnection } from "./repositories/SqliteConnection";
import { ProductRepository } from "./repositories/ProductRepository";
import { CreateProductUsecase } from "./usecases/CreateProductUsecase";

const sqliteConnection = new SqliteConnection("db/estoque.db");
const productRepository = new ProductRepository(sqliteConnection);
const createProductUsecase = new CreateProductUsecase(productRepository);

let barcodeInput: string = readlineSync.question("Enter product barcode: ");
let nameInput: string = readlineSync.question("Enter product name: ");
let orderReferenceDaysInput: number = parseInt(readlineSync.question("Enter order reference days: "));

const result = createProductUsecase.execute(barcodeInput, nameInput, orderReferenceDaysInput);

if (result instanceof Product) {
    console.log("Product created:");
    console.log("Barcode:", result.getBarcode());
    console.log("Name:", result.getName());
    console.log("Quantity in Stock:", result.getQuantityInStock());
    console.log("Order Reference Days:", result.getOrderReferenceDays());
} else {
    console.log(result.message);
}