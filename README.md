# Bamazon-node-app
Bamazon node app is an Amazon-like store front application using node and mysql.
The app is split into three different parts: customer, manager, and supervisor. The whole application revolves around a list of products which is stored in a table called products inside a mysql database. 

##Bamazon Customer
The customer portion of the application allows users to view the list of products and purchase any of those products by typing in the product's unique id. Their is a quantity field for each item that decreases when products are purchased. If the amount the user is trying to purchase is greater than the current quantity of the product or if the products quantity is at 0 then the purchase won't go through. If the quantity is great enough, the user will be asked to verify the purchase. Once it is verified, the purchase goes through, and the user is brought back to the product list to choose another item.
Here's an example of the product list:
[Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust1.png)
Here's an example of a purchase from beginning to end:
[Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust2.png)
Here's an exmaple of trying to purchase a product that the quantity is too low on:
![Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust3.png)
Here's an example of what happens if the user hits cancel instead of verifying the purchase:
![Bamazon Customer Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/bcust4.png)

##Bamazon Manager
The manager portion of the application has four different functionalities: viewing the product list, view products that have a quantity of 5 or less, add items to inventory(increase quantity), or add a new product to the list. Here's a picture of all the options:
![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager1.png)
The first option, viewing the product list, queries the database for all the products, similar to the customer's product list, but includes the quantity of all the products. Here's an example picture of the list: 
[Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager2.png)
The second option queries the database and makes a list of all the products that have a quantity of 5 or less. Here's an example picture: 
![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager3.png)
The third option allows the manager to increase the quantity of any of the itmes in the list. A cool feature that was added is being able to access the items either by their unique id, or by name. Here's an example of adding inventory by id: 
 ![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager4.png)
 Here's an example of adding inventory by the product's name: 
 ![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager8.png)
 The flannel product was on the low inventory list shown above. Now that the quantity was increased it's gone from the list:
 ![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager9.png)
 The final option is adding new products into the list/database. Here's what it looks like: 
 ![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager5.png)
 Once that item has been added, it will show up in the product list as demonstrated in this picture: 
 ![Bamazon Manager Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/manager6.png)

 ##Bamazon Supervisor
 The supervisor portion has 2 options which are view product sales by department and add a new department. 
![Bamazon Supervisor Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/supervisor1.png)
 There is a second table in the database that contains all the depts containing the products, as well as the over head costs of each of the depts. The view product sales by dept. option creates a cli table using the "cli-table" node package which joins the two tables on the dept name column. It then sums up the total sales of each dept, subtracts the over head costs of each dept from the total sales, then spits that value into the total profit column. Here's a picture for reference: 
![Bamazon Supervisor Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/supervisor2.png)
The final option allows the supervisor to create a new dept, which is where the over head costs column comes from. Here's an example of adding the "grocery" dept then viewing the product sales table after it was created:
  ![Bamazon Supervisor Image](https://github.com/brandolern/bamazon-node-app/blob/master/images/supervisor3.png)

##Notes
A weird problem I ran into using the cli table node app was that it throws an error anytime a value that is null is passed into it. This was a problem because anytime a new dept was created the total sales value would come back as null because a product had not been added into that dept yet. I found two solutions: using cases in mysql to change the null value to 0, or run a map() function on the table array after the values had already been pulled out of the query response, which can also change the null values to 0. 


