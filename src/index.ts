import { Product } from "./entities/Product.js";
import readlineSync from "readline-sync";

let barcode: string = readlineSync.question("Enter product barcode: ");
let name: string = readlineSync.question("Enter product name: ");
let orderReferenceDays = parseInt(readlineSync.question("Enter order reference days: "));

const product = Product.create(barcode, name, orderReferenceDays);

if (product instanceof Error) {
    console.error("Error creating product:", product.message);
} else {
    console.log("Product created successfully:");
    console.log("Barcode:", product.getBarcode());
    console.log("Name:", product.getName());
    console.log("Quantity in Stock:", product.getQuantityInStock());
    console.log("Order Reference Days:", product.getOrderReferenceDays());
}
