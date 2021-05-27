import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Frontpage from './frontpage'


export default (
    <Route path="/" component={App}>
      <IndexRoute component={Frontpage} />
      <Route path="/posts" component={PostPage} />
      <Route path="/my-profile" component={ProfilePage} />
    </Route>
  );

  //other routes are placeholders for the other pages ppl are making --Rowan

