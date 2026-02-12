import { SqliteConnection } from "./repositories/SqliteConnection";
import { ProductRepository } from "./repositories/ProductRepository";
import { ProductOrderRepository } from "./repositories/ProductOrderRepository";
import { CreateProductUsecase } from "./usecases/CreateProductUsecase";
import { GetProductUsecase } from "./usecases/GetProductUsecase";
import { CreateProductOrderUsecase } from "./usecases/CreateProductOrderUsecase";
import { CreateProductController } from "./controllers/CreateProductController";
import { GetProductController } from "./controllers/GetProductController";
import { CreateProductOrderController } from "./controllers/CreateProductOrderController";
import fastify from "fastify";

const sqliteConnection = new SqliteConnection("db/estoque.db");

const productRepository = new ProductRepository(sqliteConnection);
const productOrderRepository = new ProductOrderRepository(
  sqliteConnection,
  productRepository
);

const createProductUsecase = new CreateProductUsecase(productRepository);
const getProductUsecase = new GetProductUsecase(productRepository);
const createProductOrderUsecase = new CreateProductOrderUsecase(
  productOrderRepository,
  productRepository
);

const createProductController = new CreateProductController(createProductUsecase);
const getProductController = new GetProductController(getProductUsecase);
const createProductOrderController = new CreateProductOrderController(
  createProductOrderUsecase
);

const app = fastify();

app.post("/products", createProductController.handle.bind(createProductController));

app.get(
  "/products/:barcode",
  getProductController.handle.bind(getProductController)
);

app.post(
  "/product-orders",
  createProductOrderController.handle.bind(createProductOrderController)
);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
