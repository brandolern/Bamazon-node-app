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
        console.log("\nPRODUCT LIST:\n" + divider);
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
            var query = connection.query("SELECT * FROM products WHERE id= " + answers.id,
                function (err, res) {

                    if (err) throw err;
                    var quantity = res[0].stock_quantity;
                    var amountOrdered = answers.amount;
                    var total = res[0].price * amountOrdered;
                    var id = answers.id;

                    if (quantity >= amountOrdered && quantity > 0) {
                        console.log("Total Purchase: $" + total);

                        inquirer
                            .prompt({
                                name: "verify",
                                type: "list",
                                message: "Please verify your purchase",
                                choices: ["Verify", "Cancel"]
                            }).then(function (answers) {

                                if (answers.verify === "Verify") {
                                    connection.query("UPDATE products SET ? WHERE ?", [{
                                        stock_quantity: quantity - amountOrdered
                                    }, {
                                        id: id
                                    }], function (err) {
                                        if (err) throw err;
                                    });

                                    console.log(`Purchase confirmed\n${amountOrdered} ${res[0].product_name}s\nTotal: $${total}`);
                                    setTimeout(function () {
                                        start()
                                    }, 1500);

                                } else {
                                    console.log("\nTransaction cancelled\n");
                                    pickProduct();
                                }
                            });
                    } else {
                        console.log("\nInsufficient quantity!\n")
                        pickProduct();
                    };
                })
        })
}