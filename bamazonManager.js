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
        message: "Choose an option:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answers) {
        switch (answers.options) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        };
    });
};

var divider = "=====================================";

function pause() {
    setTimeout(function () {
        start();
    }, 1500);
};

function viewProducts() {

    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\nProducts For Sale:\n" + divider);
        for (i = 0; i < res.length; i++) {
            console.log("Id:" + res[i].id + "\nName: " + res[i].product_name + "\nPrice: $" + res[i].price + "\nQuantity: " + res[i].stock_quantity + "\n" + divider);
        };
        pause();
    });
}

function lowInventory() {
    var query = connection.query("SELECT id,product_name,stock_quantity FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) throw err;
        console.log("\nLow Product Inventory:\n" + divider)
        for (i = 0; i < res.length; i++) {
            console.log("Id: " + res[i].id + "\nName: " + res[i].product_name + "\nQuantity: " + res[i].stock_quantity + "\n" + divider);
        };
        pause();
    });
};

function addInventory() {

    console.log("\nAdd More Product to Inventory\n");
    inquirer
        .prompt([{
            name: "product",
            type: "input",
            message: "Enter the Id or Name of the Product:",
        }, {
            name: "amount",
            type: "input",
            message: "How Many Would You Like to Add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(function (answers) {

            var product = answers.product;
            var amount = parseFloat(answers.amount);

            if (isNaN(product) === false) {
                var query = `SELECT stock_quantity,product_name FROM products WHERE id=${product}`;

                connection.query(query, function (err, res) {
                    var name = res[0].product_name;
                    var quantity = res[0].stock_quantity + amount;

                    connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: quantity
                            },
                            {
                                id: product
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(`\nAdded ${amount} to Inventory \nNew ${name} Quantity: ${quantity}\n`);
                            pause();
                        })
                });
            } else {
                var query = `SELECT stock_quantity,product_name FROM products WHERE product_name= '${product}'`;

                connection.query(query, function (err, res) {
                    var name = res[0].product_name;
                    var quantity = res[0].stock_quantity + amount;

                    connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: quantity
                            },
                            {
                                product_name: product
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(`Added ${amount} to Inventory \nNew ${name} Quantity: ${quantity}\n`);
                            pause();
                        });
                });
            };
        });
};


function addProduct() {

}