import React from 'react';
import {shallow} from 'enzyme';
import {LinkContainer} from 'react-router-bootstrap';

import UserDropdown from './UserDropdown';

describe('UserDropdown', ()=> {
  
  let wrapper,
      spy;
  beforeAll(()=> {
    spy = jasmine.createSpy('spy');
    wrapper = shallow(<UserDropdown 
    username="name"
    logout={spy} />);
  });
    
  it('renders the username', ()=> {
    
    expect(wrapper.prop('title')).toBe('name');
    
  });
  
  it('calls logout() on logout link menu item click', ()=> {
    const logoutLink = wrapper.find('.logout-link');
    expect(logoutLink.length).toBe(1);
    
    logoutLink.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  
  it('has a link to "MyProfile"', ()=> {
    
    const link = wrapper.find(LinkContainer);
    expect(link.length).toBe(1);
    expect(link.prop('to')).toBe('/my-profile');
  });
  
});