# Orders API

## Related APIs
https://github.com/sivorijr/Api-books-node<br>
https://github.com/sivorijr/Api-customers-node

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
&emsp;customerID: {<br>
&emsp;&emsp;type: String,<br>
&emsp;&emsp;require: true<br>
&emsp;},<br>
&emsp;bookID: {<br>
&emsp;&emsp;type: String,<br>
&emsp;&emsp;require: true<br>
&emsp;},<br>
&emsp;deliveryDate: {<br>
&emsp;&emsp;type: Date,<br>
&emsp;&emsp;require: false<br>
&emsp;}<br>
}
 
 
## Authors
 
* **Sivori Junior**: [![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/sivorijr)](https://github.com/sivorijr)
 
 
Please follow github and join us!
Thanks to visiting me and good coding!
