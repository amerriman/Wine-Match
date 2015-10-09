process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));

var server = require('../server/app');
var User = require("../server/models/user");


var should = chai.should();
chai.use(chaiHttp);



describe('Users', function(){
  User.collection.drop();

    beforeEach(function(done){
      var testUser = new User({
        name: "Ashley",
        password: "test",
        wines:[
          {
            wineName: "Benmarco Cabernet Sauvignon",
            image: "http://ei.isnooth.com/multimedia/d/4/a/image_990323_square.jpeg",
            varietal: "Cabernet Sauvignon",
            vintage: 2009,
            code: "benmarco-cabernet-sauvignon-2008-9",
            notes: "A lot of Cabernet at this price.",
            score: 93,
            recipes: [
              {
              title: "Spinach & Herb Risotto",
              sourceLink: "http://www.finecooking.com/recipes/spinach_herb_risotto.aspx",
              foodImage: "http://ei.isnooth.com/multimedia/c/2/6/image_46377.jpeg"
              }
            ]
          }
        ]
      });
      testUser.save(function(err) {
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
      // console.log(res.body[0].wines[0].recipes, 'GET ALL');
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
          wineName: "Buried Cane Cabernet Sauvignon",
          image: "http://ei.isnooth.com/multimedia/1/a/0/image_3790112_square.jpeg",
          varietal: "Cabernet Sauvignon",
          vintage: 2013,
          code: "benmarco-cabernet-sauvignon-2008-9",
          notes: "Decent party wine.",
          score: 77,
          recipes: [
              {
              title: "Herb-Crusted Rack of Lamb",
              sourceLink: "http://www.finecooking.com/recipes/herb-crusted-rack-of-lamb.aspx",
              foodImage: "http://ei.isnooth.com/multimedia/3/e/4/image_48631.jpeg"
              }
            ]
        }
      ]
    });
    newUser.save(function(err, data){
      chai.request(server)
      .get('/api/user/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body, 'GET ONE');
        done();
      });
    });
  });


// POST one
  it('should add a SINGLE user on api/users POST', function(done){
    chai.request(server)
    .post('/api/users')
    .send({'name': "Mark",
          'password': "test",
          'wines':
            {
            'wineName': "Buried Cane Cabernet Sauvignon",
            'image': "http://ei.isnooth.com/multimedia/1/a/0/image_3790112_square.jpeg",
            'varietal': "Cabernet Sauvignon",
            'vintage': 2013,
            'code': "benmarco-cabernet-sauvignon-2008-9",
            'notes': "Decent party wine.",
            'score': 77,
            'recipes': [
                // {
                // 'title': "Herb-Crusted Rack of Lamb",
                // 'sourceLink': "http://www.finecooking.com/recipes/herb-crusted-rack-of-lamb.aspx",
                // 'foodImage': "http://ei.isnooth.com/multimedia/3/e/4/image_48631.jpeg"
                // }
              ]
            },

      })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      console.log(res.body.SUCCESS, 'POST ONE');
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('wines');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Mark');
      res.body.SUCCESS.wines.should.be.a('array');
      // res.body.SUCCESS.wines[0].should.have.property('image');
      // res.body.SUCCESS.wines[0].should.have.property('vintage');
      // res.body.SUCCESS.wines[0].vintage.should.equal(2013);
      // res.body.SUCCESS.wines[0].recipes[0].should.be.a('object');
      // res.body.SUCCESS.wines[0].recipes[0].should.have.property('title');
      // res.body.SUCCESS.wines[0].recipes[0].title.should.equal('Herb-Crusted Rack of Lamb');
      done();
    });
  });

//update one on PUT (not really working on a deep level)
  it('should update a SINGLE user on /user/<id> PUT', function(done){
    chai.request(server)
    .get('/api/users')
    .end(function(err, res){
      // console.log(res.body, "PREPUT")
      chai.request(server)
      .put('/api/user/' + res.body[0]._id)
      .send({'name': 'Kevin'})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        // console.log(response.body, "PUT");
        response.body.should.be.a('object');
        response.body.should.have.property('UPDATED');
        response.body.UPDATED.should.be.a('object');
        response.body.UPDATED.should.have.property('name');
        response.body.UPDATED.should.have.property('_id');
        response.body.UPDATED.name.should.equal('Kevin');
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


