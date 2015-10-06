var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema (
  {
    name: String,
    password: String,
    wines:[
      {
        wineName: String,
        image: String,
        varietal: String,
        vintage: Number,
        code: String,
        notes: String,
        score: Number,
        recipes: [
          {
            name: String,
            sourceLink: String,
            image: String
          }
        ]
      }
    ]
  }
);

module.exports = mongoose.model('users', User);
