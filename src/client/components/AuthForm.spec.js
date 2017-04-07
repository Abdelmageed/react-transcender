import React from 'react';
import {mount} from 'enzyme';

import AuthForm from './AuthForm';
import {SignupForm} from './SignupForm';
import {LoginForm} from './LoginForm';

describe('AuthForm', ()=> {
  
  let wrapper;
  beforeEach(()=> {
    wrapper = mount(
        <AuthForm />
      );
  });
  
  afterEach(()=> {
    wrapper.unmount();
  });
  
  it('should render either a signup form or a login form based on state', ()=> {
    
      expect(wrapper.find(LoginForm).length).toBe(1);
      expect(wrapper.find(SignupForm).length).toBe(0);

      wrapper.setState({
        activeForm: 'signup'
      });
      expect(wrapper.find(SignupForm).length).toBe(1);
      expect(wrapper.find(LoginForm).length).toBe(0);
    
  });
  
  it('toggleActiveForm() toggles signup/login forms', ()=> {
    
    expect(wrapper.state('activeForm')).toBe('login');
    wrapper.instance().toggleActiveForm();
    expect(wrapper.state('activeForm')).toBe('signup');
  });
  
});