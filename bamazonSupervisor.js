var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


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
    var query = "SELECT d.department_id, p.department_name, SUM(p.product_sales)'Total Sales', d.over_head_costs 'Over Head',";
    query += "SUM(p.product_sales) - d.over_head_costs 'Total Profit'FROM products p LEFT JOIN departments d ON"
    query += " d.department_name = p.department_name GROUP BY department_name ORDER BY department_id;"
    connection.query(query, function (err, res) {
        if (err) throw err;

        var table = new Table({
            colWidths: [20, 20, 20, 20, 20],
            head: ["Department Id", "Department Name", "Over Head Costs", "Product Sales", "Total Profit"]
        });

        for (i = 0; i < res.length; i++) {
            var obj = res[i];
            var values = [];
            for (var property in obj) {
                values.push(obj[property]);
            };
            table.push([values[0], values[1], values[2], values[3], values[4]]);
        };
        console.log(table.toString());
    });
};

function createDepartment() {

};