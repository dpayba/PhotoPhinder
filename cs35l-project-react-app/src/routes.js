import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Frontpage from './frontpage';
import { MainFeed, PostCreator } from './components/posts.js';
import { SignIn } from './components/auth.js';
import { SignUp } from './components/auth.js';
import { CurrentUserProfile, OtherUserProfile } from './components/profile.js';
import { firebase } from './firebase';
import SearchForUser from './components/search.js';

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
            <PrivateRoute path="/upload" component={PostCreator} />
            <PrivateRoute path="/feed" component={MainFeed} />
            <PrivateRoute path="/profile" component={CurrentUserProfile} />
            <PrivateRoute path="/search" component={SearchForUser} />
            <PrivateRoute path="/view-user/:uid" component={OtherUserProfile} />
        </Switch>
    );
};

export default Routes;

//other routes are needed for the other pages ppl are making --Rowan
