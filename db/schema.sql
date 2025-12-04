create table products (
barcode text primary key,
name text not null,
quantity_in_stock integer not null,
order_reference_days integer not null);

create table ProductOrder(
uuid text primary key,
product text not null,
quantity integer not null,
orderDate text not null,

foreign key (product) references products(barcode));
