//request is a library that allow us to send request to another node services
//using request we can call get, post,call to our services

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")


app.use(bodyParser.json())


mongoose.connect("mongodb+srv://rehan:<password>@cluster0-73yvp.mongodb.net/ordersservice?retryWrites=true&w=majority",() => {
  console.log("Database connected - Orders");
})


//model is loaded
require("./order")
const Order = mongoose.model("Order")

app.post("/order",(req,res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  }
  var order = new Order(newOrder)

  order.save().then(()=>{
    res.send("Order created with success");
  }).catch((err) => {
    if(err){
      throw err;
    }
  })
})

app.get("/orders", (req,res) => {

 Order.find().then((orders) => {
    res.json(orders)
  }).catch((err) => {
    if(err){
      throw err;
    }
  })
})

app.get("/order/:id", (req,res) => {
  Order.findById(req.params.id).then((order) => {
    if(order){

      axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response) => {
        //console.log(response)
        var orderObject = {customerName: response.data.name, bookTitle: ''}
      axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {
        orderObject.bookTitle = response.data.title
        res.json(orderObject)
      })
      })
      
    }else{
      res.send("Invalid User ID")
    }
  }).catch(err => {
    if(err){
      throw err;
    }
  })
})
//axios is a http library that allow to make http request to any address
//so after installing it we can make http request to other services
// order model
// CustomerID <--
// BookID <--
// GotDate <--
// DeliveryDate <--

app.listen(7777,() => {
  console.log("Up and running - Order services");

})
