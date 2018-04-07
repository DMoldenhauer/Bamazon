DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT Null,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball", "Sporting Goods", 5.25, 205);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Backpack", "Sporting Goods", 25.59, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Better Nutrition", "Books", 56.22, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bath Towel", "Bed and Bath", 22.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Galaxy Tablet", "Electronics", 325.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 8.95, 62);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rubiks Cube", "Toys", 9.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Health and Beauty", 6.25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain Crunch", "Groceries", 4.75, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Picture Frame", "Home Furnishings", 14.67, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk Chair", "Office", 275.90, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lawnmower", "Garden", 389.89, 10);