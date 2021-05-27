import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Frontpage from './frontpage'


const Routes = () => {
    return(
    <Switch>
        <Route exact path="/" component={Frontpage}></Route>
    </Switch>
    );
}

export default Routes;




  //other routes are needed for the other pages ppl are making --Rowan

