import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Frontpage from './frontpage';
import { Feed, PostCreator } from './components/posts.js';
import { SignIn } from './components/auth.js';
import { SignUp } from './components/auth.js';
import Profile from './components/profile.js';
import { firebase } from './firebase';
import { Chat } from './components/chat.js';

function PrivateRoute({ component: Component, authed, ...rest }) {
    /* only users who are authenticated can visit this kind of route */
    return (
        <Route
            {...rest}
            render={(props) =>
                firebase.auth().currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }, 
                            /* pass the path to the login component, so that the 
                             * user will be redirected to the page they were trying 
                             * to get to after logging in */
                        }}
                    />
                )
            }
        />
    );
}

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Frontpage}></Route>
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Routh path="/chat" component={Chat} />
            <PrivateRoute path="/upload" component={PostCreator} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    );
};

export default Routes;

//other routes are needed for the other pages ppl are making --Rowan
