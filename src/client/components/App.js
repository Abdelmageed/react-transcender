import React, {Component, PropTypes} from 'react';
import Nav from '../containers/Nav';

export default class App extends Component{
  
  constructor(props){
    super(props);
    
  }
  
  render(){
    return (
      <div>
        <Nav />
      {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
};