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
    var divider = "=====================================";
    var query = connection.query("SELECT * FROM products", function (err, res) {
        console.log("PRODUCT LIST:\n" + divider);
        for (i = 0; i < res.length; i++) {
            console.log("\nId:" + res[i].id + "\nName: " + res[i].product_name + "\nPrice: $" + res[i].price);
        }
        console.log(divider);
        pickProduct();
    });
};

function pickProduct() {
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "What is the ID of the product you'd like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answers) {
            var query = connection.query("SELECT stock_quantity FROM products WHERE id= " + answers.id,
                function (err, res) {
                    if (err) throw err;
                    console.log("Quantity Remaining: " + res);
                })
        })
}