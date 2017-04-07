import React from 'react';
import {shallow, mount} from 'enzyme';
//import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl} from 'react-bootstrap';
import * as errors from '../constants/errors';

import {SignupForm} from './SignupForm';

describe('SignupForm', ()=> {
  
  const matchError = "Passwords must match";
  
  let spyHandleChange,
      spyValidatePassword,
      spyRemovePasswordError,
      spyValidateSubmit,
      spyCheckUsername,
      wrapper,
      controls,
      passwordControl,
      passwordConfirmControl,
      usernameControl,
      submitButton,
      spyToggle,
//      submit,
      spySubmit;
  
  beforeEach(()=> {
//    submit = (state)=> {};
    
    spySubmit = jasmine.createSpy('spySubmit');
    spyToggle = jasmine.createSpy('spyToggle');
    spyOn(SignupForm.prototype, 'handleChange').and.callThrough();
    spyOn(SignupForm.prototype, 'validatePassword').and.callThrough();
    spyOn(SignupForm.prototype, 'removePasswordError').and.callThrough();
    spyOn(SignupForm.prototype, 'validateSubmit').and.callThrough();
    spyOn(SignupForm.prototype, 'checkUsername').and.callThrough();


//    spyHandleChange = sinon.spy(SignupForm.prototype, 'handleChange');
//    spyValidatePassword = sinon.spy(SignupForm.prototype, 'validatePassword');
//    spyRemovePasswordError = sinon.spy(SignupForm.prototype, 'removePasswordError');
//    spyValidateSubmit = sinon.spy(SignupForm.prototype, 'validateSubmit');
//    spyCheckUsername = sinon.spy(SignupForm.prototype, 'checkUsername');

    wrapper = mount(<SignupForm 
    submit={spySubmit}
    checkUsernameError={errors.usernameInUse}
    checkUsername={()=>{}}
    toggleForm={spyToggle}/>),
    controls = wrapper.find(FormControl),
    usernameControl = controls.at(0),
    passwordControl = controls.at(1),
    passwordConfirmControl = controls.at(2),
    submitButton = wrapper.find('.submit-button');
  });
  
  afterEach(()=> {
//    spyValidatePassword.restore();
//    spyRemovePasswordError.restore();
//    spyHandleChange.restore();
//    spyValidateSubmit.restore();
//    spyCheckUsername.restore();
    wrapper.unmount();
  });
  
  it('has 3 inputs for username, password and, password confirmation. And 1 submit button.', ()=> {
    
    const wrapper = shallow(<SignupForm />);
    
    const inputs = wrapper.find(FormControl);
    expect(inputs.at(0).prop('name')).toBe('username');
    expect(inputs.at(1).prop('name')).toBe('password');
    expect(inputs.at(2).prop('name')).toBe('passwordConfirm');

    const button = wrapper.find('.submit-button');
    expect(button.length).toBe(1);
  });
  
  it('updates state with input change', ()=> {
    
    const e = {target: usernameControl, value: 'a'};
    usernameControl.simulate('change', e);
    
    expect(SignupForm.prototype.handleChange).toHaveBeenCalled();
    expect(SignupForm.prototype.handleChange.calls.argsFor(0)[0].value).toBe(e.value);
  });
  
  describe('Password Controls', ()=> {
        
    describe('validatePassword()', ()=> {
    
    it('should not set state.matchError if the two fields match', ()=> {
      
    wrapper.setState({
      password: 'a',
      passwordConfirm: 'a' 
    });
    
    passwordControl.simulate('blur');
    expect(SignupForm.prototype.validatePassword).toHaveBeenCalled();
    expect(wrapper.state('matchError')).toBe('');
    
    });
    
    it('should not set state.matchError if one field is clean', ()=> {
      
      wrapper.setState({
        password: 'a'
      });
      
      passwordConfirmControl.simulate('blur');
      passwordControl.simulate('blur');
      expect(wrapper.state('matchError')).toBe('');

      wrapper.setState({
        passwordConfirm: 'a' 
      });
      
      passwordConfirmControl.simulate('blur');
      passwordControl.simulate('blur');
      expect(wrapper.state('matchError')).toBe('');
    });
    
    it('should set state.matchError if passwords do not match', ()=> {
      
      wrapper.setState({
        password: 'a',
        passwordConfirm: 'b'
      });
      
      
      passwordControl.simulate('blur');
      expect(SignupForm.prototype.validatePassword).toHaveBeenCalled();
      expect(wrapper.state('matchError')).toBe(matchError);
      
      passwordControl.simulate('blur');
      expect(SignupForm.prototype.validatePassword).toHaveBeenCalled();
      expect(wrapper.state('matchError')).toBe(matchError);

    });
    
  });
  
    describe('removePasswordError()', ()=> {
      
      it('should be called onChange', ()=> {
        
        wrapper.setState({
          errors: {matchError},
          password: 'a',
          passwordConfirm: 'aa'
        });
        
        const e = {
          target: passwordControl,
          value: 'b'
        };
        
        passwordControl.simulate('change', e);
        expect(SignupForm.prototype.removePasswordError).toHaveBeenCalled();
        expect(SignupForm.prototype.handleChange).toHaveBeenCalled();
        expect(SignupForm.prototype.handleChange.calls.argsFor(0)[0].value).toBe(e.value);

      });
      
      it('should remove match error from state, if passwords match', ()=> {
        
        wrapper.setState({
          password: 'aa',
          passwordConfirm: 'aa',
          errors: {matchError}
        });
        
        wrapper.instance().removePasswordError();
        
        expect(wrapper.state('matchError')).toBe('');

      });
      
    });
  });
  
  describe('Submit Button', ()=> {
    
    it('calls validateSubmit on click', ()=> {
      submitButton.simulate('click');
      expect(SignupForm.prototype.validateSubmit).toHaveBeenCalled();
    });
    
    it('validateSumbit() calls submit(user) if there are no validation errors', ()=> {
      
      wrapper.setState({
        username: 'name to pass required validation',
        password: 'valid password'
      });
      wrapper.setProps({checkUsernameError: ''});
      wrapper.instance().validateSubmit();
      expect(spySubmit).toHaveBeenCalled();
     });
    
    it('validateSumbit() should not call submit(user) if there are validation errors', ()=> {
      
      wrapper.setState({
        password: 'a',
        passwordConfirm: 'b',
        matchError: matchError
      });
      wrapper.instance().validateSubmit();
      expect(wrapper.state('matchError')).not.toBe('');
      expect(spySubmit).not.toHaveBeenCalled();

    });
    
    it('should show errors on submit if required fields are missing', ()=> {
      const requiredFieldsError = wrapper.find('.required-fields-error');

      wrapper.instance().validateSubmit();
      expect(wrapper.state('requiredFieldsError')).not.toBe('');
      expect(requiredFieldsError.text()).not.toBe('');
  });
    
    it('should remove "required fields" errors if required fields are not empty', ()=> {
      
      wrapper.instance().validateSubmit();
      expect(wrapper.state('requiredFieldsError')).not.toBe('');
      
      wrapper.instance().state = {
        username: 'someone',
      };
      const e = {
        target: passwordControl,
        value: "someone's passowrd"
      };
      passwordControl.simulate('change', e);
      expect(wrapper.state('requiredFieldsError')).toBe('');

    });
    
  });
  
  describe('Username Control', ()=> {
    
    it('should call checkUsername onChange', ()=> {
      
      const e = {
        value: '',
        target: usernameControl
      };
      usernameControl.simulate('change', e);
      expect(SignupForm.prototype.checkUsername).toHaveBeenCalled();
    });
    
  });
  
  it('has a "Sign in" button which toggles the login form', ()=> {
    const toggleButton = wrapper.find('.toggle-button');
    expect(toggleButton.length).toBe(1);
    expect(toggleButton.text()).toContain('Sign in');
    
    toggleButton.simulate('click');
    expect(spyToggle).toHaveBeenCalled();
  });
  
  it('should show username validation errors', ()=> {
    const usernameError = wrapper.find('.username-error');
    expect(usernameError.text()).toContain(errors.usernameInUse);
  });
});