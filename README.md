Orders API

Base URL - https://api-orders-node.herokuapp.com/

GET - /orders - Get all orders<br>
GET - /order/:id - Get order of specific id<br>
DELETE - /order/:id - Delete order of specific id<br>

POST - /order - Create new order<br>
order = {<br>
  customerID: {
    type: String,
    require: true
  },<br>
  bookID: {
    type: String,
    require: true
  },<br>
  deliveryDate: {
    type: Date,
    require: false
  }<br>
}
