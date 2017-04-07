import React from 'react';
import {shallow} from 'enzyme';

import App from './App';
import Nav from '../containers/Nav';
describe("App", ()=> {
  const wrapper = shallow(<App />);
  it('should have a Nav', ()=> {
    const nav = wrapper.find(Nav);
    expect(nav.length).toBe(1);
  });
  
});