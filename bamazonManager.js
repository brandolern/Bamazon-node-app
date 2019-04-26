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
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
    }).then(function (answers) {
        switch (answers.options) {
            case "View products for sale":
                viewProducts();
                break;

            case "View low inventory":
                lowInventory();
                break;

            case "Add to inventory":
                addInventory();
                break;

            case "Add new product":
                addProduct();
                break;
        };
    });
};

function viewProducts() {

};

function lowInventory() {

};

function addInventory() {

};

function addProduct() {

};