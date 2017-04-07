import React from 'react';
import {shallow, mount} from 'enzyme';
//import {expect} from 'chai';
import {LoginForm} from './LoginForm';
import {FormGroup} from 'react-bootstrap';
//import sinon from 'sinon';

describe('Login Form', ()=> {
  
  it('has 2 <FormGroup/>s, one for username the other for password', ()=> {
    
    const wrapper = shallow(<LoginForm />);
    const formGroups = wrapper.find(FormGroup);
    
    expect(formGroups.length).toBe(2);
  });
  
  it('has a "Create Account" button which toggles the signup form', ()=> {
    const spy = jasmine.createSpy('spy');
    const wrapper = shallow(<LoginForm toggleForm={spy} />);
    const toggleButton = wrapper.find('.toggle-button');
    expect(toggleButton.length).toBe(1);
  
    toggleButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  
  describe('Form Submission', ()=> {
    
    let submit,
        spySubmit,
        spyValidateSubmit,
        wrapper,
        submitButton;
    
    beforeEach(()=> {
     submit = jasmine.createSpy('submit');
      spyOn(LoginForm.prototype, 'validateSubmit');
     wrapper = shallow(
      <LoginForm 
      submit={submit}
     />);
     submitButton = wrapper.find('.login-button');
//      console.log(wrapper);
    });
    
    afterEach(()=> {
      wrapper.unmount();
    });
    
    it('submits the user credentials only if both the username and password are provided', ()=> {
    
    
    expect(submitButton.length).toBe(1);
    
    submitButton.simulate('click');
//    expect(spyValidateSubmit.called).to.be.true;
//    expect(spySubmit.called).to.be.false;
      expect(LoginForm.prototype.validateSubmit).toHaveBeenCalled();
//      expect(submit).toHaveBeenCalled();
    
    wrapper.setState({
      username: 'name',
      password: 'password'
    }, ()=> {
      wrapper.instance().removeRequiredFieldsError();
    });
    
    submitButton.simulate('click');
    expect(LoginForm.prototype.validateSubmit).toHaveBeenCalled();
//    expect(spyValidateSubmit.called).to.be.true;
//    setTimeout(()=> {
//      expect(submit).toHaveBeenCalled();
//    }, 10);
    
  });
  
  it('shows an error message if username or password are missing on submit', ()=> {
    
    //username and password are initially ''

    //call the original method and pop error
    LoginForm.prototype.validateSubmit.and.callThrough();
    submitButton.simulate('click');
    let requiredFieldsError = wrapper.find('.required-fields-error');
    expect(requiredFieldsError.length).toBe(1);
    
    wrapper.setState({
      username: 'name',
      password: 'password'
    });
    wrapper.instance().removeRequiredFieldsError();
    
    submitButton.simulate('click');
    requiredFieldsError = wrapper.find('.required-fields-error');
    expect(requiredFieldsError.length).toBe(0);
    
  });
    
  });
  
  
  
  it('shows an error message on submitting invalid credentials', ()=> {
    const error = "Wrong username or password";
    let wrapper = mount(<LoginForm error={error} />);
    
    let errorLabel = wrapper.find('.error-label');
    expect(errorLabel.length).toBe(1);
    
    expect(errorLabel.text()).toBe(error);
    
    wrapper = mount(<LoginForm />);
    errorLabel =wrapper.find('.error-label');
    expect(errorLabel.length).toBe(0);

  });
});