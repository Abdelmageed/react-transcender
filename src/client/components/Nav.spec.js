import React from 'react';
import {shallow} from 'enzyme';
import {IndexLink} from 'react-router';
import {Navbar} from 'react-bootstrap';

import Nav from './Nav';
import CustomOverlay from './CustomOverlay';
import UserDropdown from './UserDropdown';

describe('Nav', ()=> {
  
  let wrapper = shallow(<Nav />);
 
  it('renders the auth overlay for guests and user dropdown for authenticated users', ()=> {
    
    wrapper = shallow(<Nav authenticated={false} />);
    expect(wrapper.find(CustomOverlay).length).toBe(1);
    expect(wrapper.find(UserDropdown).length).toBe(0);
    
    wrapper = shallow(<Nav 
                        authenticated={true}
                        username="name"
                    />);
    expect(wrapper.find(CustomOverlay).length).toBe(0);
    expect(wrapper.find(UserDropdown).length).toBe(1);
    
  });
  
  it('renders a brand with link to "/" i.e:"AllPolls"', ()=> {
    
    const brand = wrapper.find(Navbar.Brand);
    expect(brand.length).toBe(1);
    
    const link = brand.find(IndexLink);
    expect(link.length).toBe(1);
    expect(link.prop('to')).toBe('/');
  });
  
});