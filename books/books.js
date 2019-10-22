//load express
const express = require('express');
const app = express();
//load mongoose
const mongoose = require('mongoose');

require("./Book")
const Book = mongoose.model("Book")

//load body-parser to get data in json format by post method
//using body parser you can receive data from forms request and so on

const bodyParser = require('body-parser');

app.use(bodyParser.json());//now body parser can receive json data

//connect
mongoose.connect("mongodb+srv://rehan:<password>@cluster0-73yvp.mongodb.net/booksservice?retryWrites=true&w=majority",()=>{
  console.log("Database is connected");
});
app.get('/', (req,res)=>{
    res.send("Welcome  This is the book service");
})


//Create func
app.post("/book",(req,res)=>{
  //we need model to save our book in mongodb Database
  //console.log(req.body);
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  }
  //Create a new Book
  var book = new Book(newBook)
  book.save().then(()=>{
     console.log("new book created")
  }).catch((err)=>{
    if(err) throw err;
  })

  res.send("Testing our book route!");
})

app.get("/books",(req,res)=>{
  Book.find().then((books)=>{
    //console.log(books);
    res.json(books)
  }).catch(err =>{
     if(err) {
       throw err;
     }
  })
})

app.get("/book/:id",(req,res)=>{
  //res.send(req.params.id);
  Book.findById(req.params.id).then((book)=>{
    if(book){
      res.json(book);
    }else{
      res.sendStatus(404);
    }
  }).catch(err => {
    if(err){
      throw err;
    }
  })
  //"/book/:id/:name" -> res.send(req.params.name)
  //"/book/:id/:name/:foo" -> res.send(req.params.foo)

})

app.delete("/book/:id", (req,res)=>{
  Book.findOneAndRemove(req.params.id).then(()=>{
    res.send("Book removed with success")
  }).catch(err=>{
    if(err) {
      throw err;
    }
  })
})

app.listen(4545,()=>{
    console.log("Up and running! -- This is our Books service");

})
