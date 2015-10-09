var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WineCellar = new Schema (
  {
    name: String,
    wines:[
      {
        wineName: {type: String, unique: true},
        image: String,
        varietal: String,
        vintage: Number,
        code: String,
        notes: String,
        score: Number,
        recipes: []
      }
    ]
  }
);

module.exports = mongoose.model('wineCellars', WineCellar);


    // name: {type: String, default: "Ashley"},
    // password: {type: String, default: "test"},


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var User = new Schema (
//   {
//     // name: String,
//     // password: String,
//     wines:[
//       {
//         wineName: {type: String, unique: true},
//         image: String,
//         varietal: String,
//         vintage: Number,
//         code: String,
//         notes: String,
//         score: Number,
//         recipes: [
//           // {
//           //   title: String,
//           //   sourceLink: String,
//           //   foodImage: String
//           // }
//         ]
//       }
//     ]
//   }
// );

// module.exports = mongoose.model('users', User);


//     // name: {type: String, default: "Ashley"},
//     // password: {type: String, default: "test"},
