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
        };
    });
};

function pause() {
    setTimeout(function () {
        start();
    }, 1500);
};

function productSales() {
    var query = "SELECT d.department_id, d.department_name, SUM(p.product_sales) total_sales, d.over_head_costs over_head,";
    query += "SUM(p.product_sales) - d.over_head_costs total_profit FROM departments d LEFT JOIN products p ON"
    query += " d.department_name = p.department_name GROUP BY department_name ORDER BY department_id;"

    connection.query(query, function (err, res) {
        if (err) throw err;

        var table = new Table({
            colWidths: [15, 20, 20, 15, 15],
            head: ["Department Id", "Department Name", "Total Sales", "Over Head Costs", "Total Profit"]
        });

        for (i = 0; i < res.length; i++) {
            var obj = res[i];
            var values = [];

            for (var property in obj) {
                values.push(obj[property]);
            };

            // values = values.map(function (x) {
            //     if (x === null) return x = 0;
            //     return x;
            // });

            table.push([values[0], values[1], values[2], values[3], values[4]]);
        }
        console.log(table.toString());
        pause();
    });
};

function createDepartment() {
    inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Enter Department Name:"
            },
            {
                name: "costs",
                type: "input",
                message: "Enter the Over Head Costs:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answers) {
            connection.query("INSERT INTO departments SET ?", {
                department_name: answers.name,
                over_head_costs: answers.costs

            }, function (err, res) {
                console.log(`\nThe ${answers.name} department has been added`);
                pause();
            });
        });
};