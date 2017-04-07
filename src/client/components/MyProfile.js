import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class MyProfile extends Component {
  
  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
  }
  
  goToHome() {
    browserHistory.push('/');
  }
  
  render() {
    return (
      <div>
        <h3>My Profile</h3>
        <button onClick={this.goToHome}>home</button>
      </div>
      
    );
  }
}