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


SELECT d.department_id, p.department_name, SUM(p.product_sales) "Total Sales",  d.over_head_costs "Over Head",
SUM(p.product_sales)-d.over_head_costs "Total Profit"
FROM  products p
LEFT JOIN departments d ON d.department_name = p.department_name 
GROUP BY department_name 
ORDER BY department_id;
