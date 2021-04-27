# Orders API
 
## Technology 
 
* Node.js
 
 
## Services Used
 
* Github
* Heroku
 

## API Methods
 
Base URL - https://api-orders-node.herokuapp.com/

GET - "/orders" - Get all orders<br>
GET - "/order/:id" - Get order of specific id<br>
DELETE - "/order/:id" - Delete order of specific id<br>

POST - "/order" - Create new order<br>
order = {<br>
&emsp;customerID: {
&emsp;&emsp;type: String,
&emsp;&emsp;require: true
&emsp;},<br>
&emsp;bookID: {
&emsp;&emsp;type: String,
&emsp;&emsp;require: true
&emsp;},<br>
&emsp;deliveryDate: {
&emsp;&emsp;type: Date,
&emsp;&emsp;require: false
&emsp;}<br>
}
 
 
## Authors
 
* **Sivori Junior**: [![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/sivorijr)](https://github.com/sivorijr)
 
 
Please follow github and join us!
Thanks to visiting me and good coding!
