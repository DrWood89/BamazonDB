var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    menu();
});

// validateInteger makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
    // Value must be a positive number
    var number = (typeof parseFloat(value)) === 'number';
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return 'Please enter a positive number for the unit price.'
    }
}

function menu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'manager',
            message: 'What would you like to do today???',
            choices: ['View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product']
        })

        .then(function (list) {
            var choice = list.manager

            if (choice === 'View Products for Sale') {
                viewInventory();
                menu();
            } else if (choice === 'View Low Inventory') {
                lowInventory();
                menu();
            } else if (choice === 'Add New Product') {
                addNewProduct();
            } else if (choice === 'Add to Inventory') {
                addToInventory();
            }
            else {
                menu();
            }
        })
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function viewInventory() {
    console.log('___Inventory___');

    var query = connection.query("SELECT item_id, product_name, price, stock_quantity  FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            console.log("-----------------------------------");
        }
    });
}
function lowInventory() {
    console.log('___Low Inventory___');

    var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price) + " | " + res[i].stock_quantity;
            console.log("-----------------------------------");
        }
    });
}
function addNewProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'What is the name of the product you would like to add?.',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Please enter a department name'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Please enter price',
            filter: validateNumeric
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many of that product you want to list?',
            filter: validateInteger
        }
    ]).then(function (input) {

        console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +
            '    department_name = ' + input.department_name + '\n' +
            '    price = ' + input.price + '\n' +
            '    stock_quantity = ' + input.stock_quantity);

        // Create the insertion query string
        var query = connection.query('INSERT INTO products SET ?', input, function (error, res) {
            if (error) throw error;

            console.log('New product has been added to the inventory');
            console.log("\n---------------------------------------------------------------------\n");
            viewInventory();

        });
    })
}

// addInventory will guilde a user in adding additional quantify to an existing item
function addToInventory() {
    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID for stock_count update.',
            validate: validateInteger,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?',
            validate: validateInteger,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.item_id;
        var addQuantity = input.quantity;

        // Query db to confirm that the given item ID exists and to determine the current stock_count
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productData = data[0];
                console.log('Updating Inventory...');

                // Construct the updating query string
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;

                // Update the inventory
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;

                    console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                    console.log("\n---------------------------------------------------------------------\n");
                    viewInventory();
                    // End the database connection
                    connection.end();
                })
            }
        })
    })
}