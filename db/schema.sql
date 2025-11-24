create table products (
barcode text primary key,
name text not null,
quantity_in_stock integer not null,
order_reference_days integer not null);