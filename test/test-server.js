process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var User = require("../server/models/user");

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function(){
  User.collection.drop();

    beforeEach(function(done){
      var newUser = new User({
        name: "Ashley",
        password: "test",
        wines:[
          {
            name: "Benmarco Cabernet Sauvignon",
            image: "http://ei.isnooth.com/multimedia/d/4/a/image_990323_square.jpeg",
            varietal: "Cabernet Sauvignon",
          }
        ]
      });
      newUser.save(function(err) {
        done();
      });
    });
    afterEach(function(done){
      User.collection.drop();
      done();
    });


//GET all
  it('should list ALL users on api/users GET', function(done){
    chai.request(server)
    .get('/api/users')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });


//GET one
  it('should list a SINGLE user on api/user/<id> GET', function(done){
    var newUser = new User({
      name: "Kelly",
      password: "test",
      wines:[
        {
          name: "Barefoot",
          image: "http://www.manchester-hotels.org.uk/wp-content/uploads/2013/08/Barefoot_Wine_logo.jpg",
          varietal: "Merlot",
        }
      ]
    });
    newUser.save(function(err, data){
      chai.request(server)
      .get('/api/user/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
    });
  });


// POST one
  it('should add a SINGLE user on api/users POST', function(done){
    chai.request(server)
    .post('/api/users')
    .send({'name': "Mark", 'password': "test", 'wines':[]})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

//update one on PUT
  it('should update a SINGLE user on /user/<id> PUT', function(done){
    chai.request(server)
    .get('/api/users')
    .end(function(err, res){
      chai.request(server)
      .put('/api/user/' + res.body[0]._id)
      .send({'name': 'Fancy'})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        done();
      });
    });
  });

  it('should delete a SINGLE user on /api/user/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/users')
    .end(function(err, res){
      chai.request(server)
        .delete('/api/user/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          // console.log(response.body);
          done();
      });
    });
  });

});


