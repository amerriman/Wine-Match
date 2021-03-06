var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema (
  {
    username: String,
    password: String,
    someID: String,
    wines:[
      {
        name: String,
        image: String,
        varietal: String,
        vintage: Number,
        code: String,
        price: Number,
        notes: String,
        snoothrank: Number,
        recipes: []
      }
  ]

  }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);


// wineName: {type: String, unique: true},
