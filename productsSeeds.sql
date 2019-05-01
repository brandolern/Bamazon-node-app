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

-- Query statement for supervisor node app table
SELECT d.department_id, d.department_name,
CASE WHEN SUM(p.product_sales) IS NULL THEN 0 ELSE SUM(p.product_sales) END AS total_sales, d.over_head_costs over_head, 
CASE WHEN SUM(p.product_sales) - d.over_head_costs IS NULL THEN 0 ELSE SUM(p.product_sales) - d.over_head_costs END AS total_profit
FROM  departments d LEFT JOIN products p ON d.department_name = p.department_name 
GROUP BY department_name ORDER BY department_id;
