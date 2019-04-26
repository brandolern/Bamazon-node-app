CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100)NULL,
department_name VARCHAR(100)NULL,
price INT(50)NULL,
stock_quantity INT(100)NULL,
PRIMARY KEY(id)
);