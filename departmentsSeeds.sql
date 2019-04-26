USE bamazon;

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100)NULL,
over_head_costs INT(100) NULL,
PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES("Electronics", 675),("Outdoors", 1500),("Sports", 250),("Books",100),("Music", 75),("Health and Body", 525);