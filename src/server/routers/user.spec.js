import request from 'supertest';
import sinon from 'sinon';
import express from 'express';
import config from '../../../configs/main';
import mongoose from 'mongoose';
import {seed, reset} from '../../../util/seedData';
const User = mongoose.model('User');

const testDone = (done)=> {
  return (err, res)=> {
    if(err) {
      done.fail(err);
    } else {
      done();
    }
  };
};

describe('user router', ()=> {
  
  let sandbox;
  
  beforeAll((done)=>  {
    seed(done);
  });
  afterAll((done)=> {
    reset(done);
  });
  beforeEach(()=> {
    sandbox = sinon.sandbox.create();
  });
  afterEach(()=> {
    sandbox.restore();
  });
  describe('POST /login', ()=> {
    //using 'Abdelmageed' as a username for manual testing
    //could break if you don't provide the same password as
    //'passowrd123'
    it('should respond with 200 and user object on providing valid credentials', (done) => {
      const successMessage = "logged in successfuly";
      agent
        .post('/api/login')
        .send('username=Abdelmageed&password=password123')
        .expect(200)
        .expect((res)=> {
          expect(res.body.user.username).toBe('Abdelmageed');
      })
        .end(testDone(done));
    });
    
    it('should respond with 401 on invalid password', (done) => {
      const unauthorized = "Unauthorized";
      agent
        .post('/api/login')
        .send('username=Abdelmageed&password=password1234')
        .expect(401, unauthorized)
        .end(testDone(done))
      });
    
    it('should respond with 401 on invalid username', (done) => {
      const unauthorized = "Unauthorized";
      agent
        .post('/api/login')
        .send('username=Abdelmageedz&password=password123')
        .expect(401, unauthorized)
        .end(testDone(done));
      });

    
  });

  describe('POST /signup', () => {
    
    it('should sign up a user locally by username and password', (done)=> {
      agent
        .post('/api/signup')
        .send('username=NewUser&password=NewPassword123')
        .expect(200)
        .expect((res)=> {
          expect(res.body.user.username).toBe('NewUser')
        })
        .end(testDone(done));
    });
    
  });
  
  describe('GET /logout', ()=> {
    //kinda tricky to test
    //TODO test/simulate request cookies
    it('should log out and remove req.user', (done)=> {
      agent
        .get('/api/logout')
        .expect(200)
        .end(testDone(done));
    })
  });
  
  describe('POST /check_username', ()=> {
    
    it('should respond with {valid:false} if the username is unavailable', (done)=> {
      const stubUser = sandbox.stub(User, 'findOne');
      stubUser.yields(null, {user: 'user'});
      
      agent
        .post('/api/check_username')
        .send({username: 'name'})
        .expect(200, {valid: false})
        .end(testDone(done));
    });
    
    it('should respond with {valid:true} if the username is available', (done)=> {
      const stubUser = sandbox.stub(User, 'findOne');
      stubUser.yields(null, null);
      
      agent
        .post('/api/check_username')
        .send({username: 'name'})
        .expect(200, {valid: true})
        .end(testDone(done));
    });
  });
});