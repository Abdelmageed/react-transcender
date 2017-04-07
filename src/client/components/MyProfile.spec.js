import React from 'react';
import {shallow} from 'enzyme';

import MyProfile from './MyProfile';

let wrapper;
beforeAll(()=> {
  wrapper = shallow(<MyProfile />);
});
  
describe('MyProfile', ()=> {
  it('should have an h3 with "My Profile"', ()=> {
    const h3 = wrapper.find('h3');
    expect(h3.length).toBe(1);
    expect(h3.text()).toBe('My Profile');
  });
});