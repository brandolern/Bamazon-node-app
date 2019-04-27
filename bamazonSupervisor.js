var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sigmachi3275",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Choose an Option",
        choices: ["View Product Sales by Department", "Create New Department"]
    }).then(function (answers) {
        switch (answers.options) {
            case "View Product Sales by Department":
                productSales();
                break;

            case "Create New Department":
                createDepartment();
                break;
        }
    });
};

function productSales() {
    // SELECT d.department_id, p.department_name, SUM(p.product_sales)
    // "Total Sales", d.over_head_costs "Over Head",
    //     SUM(p.product_sales) - d.over_head_costs "Total Profit"
    // FROM products p
    // LEFT JOIN departments d ON d.department_name = p.department_name
    // GROUP BY department_name
    // ORDER BY department_id;

};

function createDepartment() {

};