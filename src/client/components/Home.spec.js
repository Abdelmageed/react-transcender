import React from 'react';
import {shallow} from 'enzyme';

import Home from './Home';

describe('Home', ()=> {
  
  let wrapper,
      h3;
  
  beforeAll(()=> {
    wrapper = shallow(
      <Home username={'Abdelmageed'}/>
    );
    h3 = wrapper.find('h3');      
  });
  
  it('should have an h3 with Hello {username}', ()=> {
    expect(h3.text()).toBe('Hello Abdelmageed');
  });
  
});