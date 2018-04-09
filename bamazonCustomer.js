//REQUIREMENTS
//----------------------------------------------------------------------
// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

//PSEUDO CODE
//--------------------------------------------------------------------------
//Create table in mySQL WB with 10 products
//npm install, npm install mysql, npm install inquirer
//build .gitignore with node_modules inside

//In this file
    // retrieve data from sql server
    // function with
        //for loop to create object of table passed back
        // console log products object for customer to see
    // use inquirer function to prompt the user with two questions and .then function to record answers
    // function to complete purchase if possible
        //if there's enough inventory, make order and change inventory and show customer total purchase cost
        //else, notify customer f insufficient inventory


//MAIN PROCESS
//--------------------------------------------------------------------------
//dependencies for npm packages

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('cli-table/lib/index');

// retrieve data from sql server

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    //Testing
    // console.log("connected as id " + connection.threadId);

    queryProducts();
});

//Functions 
//-------------------------------------------------------------------


// function with for loop to create object of table passed back
// console log products object for customer to see
function queryProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        //formats table using cli-table npm package
        var table = new Table({
            head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
            colWidths: [10, 35, 35, 10, 18]
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }

        console.log(table.toString());

        processOrder(res);
    });
}

// use inquirer function to prompt the user with two questions and record answers
function processOrder(res) {
    inquirer.prompt
        ([
            {
                name: "ID",
                message: "Please enter the item_id you would like to purchase."
            }, {
                name: "quantity",
                message: "What quantity of that product would you like to buy?"
            }
            // .then function to record answers
        ]).then(function (answers) {
            var item_id = answers.ID;
            var orderProduct = res[item_id - 1].product_name;
            var orderQuantity = answers.quantity;
            var inStockQuantity = res[item_id - 1].stock_quantity;
            var newStockQuantity = inStockQuantity - orderQuantity;
            var price = res[item_id - 1].price;
            var total = price * orderQuantity;
            // var updatedQuantity = 
            //Testing
            // console.log("orderID is:  " + item_id);
            // console.log("orderQuantity is: " + orderQuantity);
            // console.log("Product selected is: " + orderProduct);
            // console.log("Quantity in stock is: " + inStockQuantity);
            // console.log("Price is: " + price);
            // console.log("Order Total is: " + total);

            //if there's enough inventory, change inventory and show customer total purchase cost
            //       
            if (orderQuantity <= inStockQuantity) {
                connection.query('UPDATE products SET ? WHERE item_id = ?', [{ stock_quantity: newStockQuantity }, item_id]);

                // connection.end();
                console.log("\nThe following purchase is confirmed: \r");
                console.log("Product selected: " + orderProduct + "\r");
                console.log("Quantity: " + orderQuantity + "\r");
                console.log("Price: " + price + "\r");
                console.log("Your total is:  " + total);

            }
            //else, notify customer of insufficient inventory
            else
                console.log("Sorry, there is insufficient stock to complete your order.");
            
                connection.end();
        });

};





