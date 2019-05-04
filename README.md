# Bamazon-node-app
Bamazon node app is an Amazon-like store front application using node and mysql.
The app is split into three different parts: customer, manager, and supervisor. The whole application revolves around a list of products which is stored in a table called products inside a mysql database. 

##Bamazon Customer
The customer portion of the application allows users to view the list of products and purchase any of those products. Their is a quantity for each item that decreases when products are purchased. If the amount the user is trying to purchase is greater than the current quantity of the product or if the products quantity is at 0 then the purchase won't go through. If the quantity is great enough the user will be asked to verify the purchase. Once it is verified the user is brought back to the product list to choose another item.
Here's an example of the product list:
![Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust1.png)
Here's an example of a purchase from beginning to end:
![Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust2.png)
Here's an exmaple of trying to purchase a product that the quantity is too low on:
![Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust3.png)
Here's an example of what happens if the user hits cancel instead of verifying the purchase:
![Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust4.png)

##Bamazon Manager
The manager portion of the application has four different functionalities: viewing the product list, view products that have a quantity of 5 or less, add items to inventory(increase quantity), or add a new product to the list. Here's a picture of all the options:
![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager1.png)
The first 
