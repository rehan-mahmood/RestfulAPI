const mongoose = require('mongoose');
//A model -> collection

mongoose.model("Book",{
  //Title, author, numberPage, publisher
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  numberPages: {
    type: Number,
    require: false
  },
  publisher: {
    type: String,
    require: false
  }
});
