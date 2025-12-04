import Product from '../../src/entities/Product';
import { SqliteConnection } from '../../src/repositories/SqliteConnection';
import { ProductRepository } from '../../src/repositories/ProductRepository';

describe('ProductRepository', () => {
	let sqliteConnection: SqliteConnection;

	beforeEach(() => {
		sqliteConnection = new SqliteConnection(':memory:');
		const db = sqliteConnection.getConnection();
		db.exec(`
			drop table if exists products;
			create table products (
				barcode text primary key,
				name text not null,
				quantity_in_stock integer not null,
				order_reference_days integer not null
			)
		`);
	});

	test('should return Product when barcode exists', () => {
		const db = sqliteConnection.getConnection();
		db.prepare(
			'insert into products (barcode, name, quantity_in_stock, order_reference_days) values (?, ?, ?, ?)'
		).run('123', 'Refrigerante', 25, 7);

		const repository = new ProductRepository(sqliteConnection);
		const product = repository.findByBarcode('123');

		expect(product).toBeInstanceOf(Product);
		expect(product?.getName()).toBe('Refrigerante');
		expect(product?.getQuantityInStock()).toBe(25);
	});

	test('should return null when barcode does not exist', () => {
		const repository = new ProductRepository(sqliteConnection);

		const product = repository.findByBarcode('999');

		expect(product).toBeNull();
	});
});