import Product from '../../src/entities/Product';
import ProductOrder from '../../src/entities/ProductOrder';
import { ProductOrderRepositoryInterface } from '../../src/repositories/ProductOrderRepository';
import { CreateProductOrderUsecase } from '../../src/usecases/CreateProductOrderUsecase';

describe('CreateProductOrderUsecase', () => {
    test('should create a product order successfully', async () => {
  
        class ProductOrderRepositoryMock implements ProductOrderRepositoryInterface {
            findByUuid(uuid: string): ProductOrder | null {
                return null;
            }
            save(productOrder: ProductOrder): void {
            }
        }

        const productOrderRepositoryMock = new ProductOrderRepositoryMock();
        const createProductOrderUsecase = new CreateProductOrderUsecase(productOrderRepositoryMock);

        const product = Product.rebuild('1234567890123', 'Test Product', 10, 14);
        const quantity: number = 5;
        const orderDate: Date = new Date('2025-12-13');

        const result = createProductOrderUsecase.execute(product, quantity, orderDate);

        expect(result).toBeInstanceOf(ProductOrder);
        if (result instanceof ProductOrder) {
            expect(result.getProduct()).toBe(product);
            expect(result.getQuantity()).toBe(quantity);
            expect(result.getOrderDate()).toEqual(orderDate);
            expect(result.getUuid()).toBeDefined();
        }
    });

    test('should return ERROR if product is invalid', async () => {
  
        class ProductOrderRepositoryMock implements ProductOrderRepositoryInterface {
            findByUuid(uuid: string): ProductOrder | null {
                return null;
            }
            save(productOrder: ProductOrder): void {
            }
        }

        const productOrderRepositoryMock = new ProductOrderRepositoryMock();
        const createProductOrderUsecase = new CreateProductOrderUsecase(productOrderRepositoryMock);

        const product = null as any;
        const quantity: number = 5;
        const orderDate: Date = new Date('2025-12-13');

        const result = createProductOrderUsecase.execute(product, quantity, orderDate);

        expect(result).toBeInstanceOf(Error);
    });  
    
    test('should return ERROR if quantity is invalid', async () => {
  
        class ProductOrderRepositoryMock implements ProductOrderRepositoryInterface {
            findByUuid(uuid: string): ProductOrder | null {
                return null;
            }
            save(productOrder: ProductOrder): void {
            }
        }

        const productOrderRepositoryMock = new ProductOrderRepositoryMock();
        const createProductOrderUsecase = new CreateProductOrderUsecase(productOrderRepositoryMock);

        const product = Product.rebuild('1234567890123', 'Test Product', 10, 14);
        const quantity: number = -5;
        const orderDate: Date = new Date('2025-12-13');

        const result = createProductOrderUsecase.execute(product, quantity, orderDate);

        expect(result).toBeInstanceOf(Error);
        if (result instanceof Error) {
            expect(result.message).toBe('Quantity must be positive');
        }
    }); 
    
    test('should return ERROR if order date is invalid', async () => {
  
        class ProductOrderRepositoryMock implements ProductOrderRepositoryInterface {
            findByUuid(uuid: string): ProductOrder | null {
                return null;
            }
            save(productOrder: ProductOrder): void {
        
            }
        }

        const productOrderRepositoryMock = new ProductOrderRepositoryMock();
        const createProductOrderUsecase = new CreateProductOrderUsecase(productOrderRepositoryMock);

        const product = Product.rebuild('1234567890123', 'Test Product', 10, 14);
        const quantity: number = 5;
        const orderDate: Date = new Date('invalid date');

        const result = createProductOrderUsecase.execute(product, quantity, orderDate);

        expect(result).toBeInstanceOf(Error);
        if (result instanceof Error) {
            expect(result.message).toBe('Order date must be valid');
        }
    });        

    test('should return ERROR if repository throws an error', async () => {
  
        class ProductOrderRepositoryMock implements ProductOrderRepositoryInterface {
            findByUuid(uuid: string): ProductOrder | null {
                return null;
            }
            save(productOrder: ProductOrder): void {
                throw new Error('Database connection lost');
            }
        }

        const productOrderRepositoryMock = new ProductOrderRepositoryMock();
        const createProductOrderUsecase = new CreateProductOrderUsecase(productOrderRepositoryMock);

        const product = Product.rebuild('1234567890123', 'Test Product', 10, 14);
        const quantity: number = 5;
        const orderDate: Date = new Date('2025-12-13');

        const result = createProductOrderUsecase.execute(product, quantity, orderDate);

        expect(result).toBeInstanceOf(Error);
        if (result instanceof Error) {
            expect(result.message).toBe('Error creating product order');
        }
    });            
});
