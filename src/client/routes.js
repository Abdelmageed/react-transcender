import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';

import * as actionCreators from './actions/actionCreators';

import App from './components/App';
import Home from './containers/Home';
import MyProfile from './components/MyProfile';

export const getRoutes = (store)=> {

  const redirectIfNotAuth = (nextState, replaceState)=> {
    const isAuthenticated = store.getState().user.isAuthenticated;
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      replaceState({
        pathname: '/'
      });
    }
  }
  
  return(
    <Route path="/" component={App}>
      <IndexRoute 
      component={Home} />
      <Route 
        path="my-profile" 
        component={MyProfile}
        onEnter={redirectIfNotAuth}
        />
    </Route>
  );
}

