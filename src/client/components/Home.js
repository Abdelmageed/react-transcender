import React, {Component, PropTypes} from 'react';

export default class Home extends Component {
  
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <h3>Hello {this.props.username}</h3>
    )
  }
}