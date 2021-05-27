import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Frontpage from './frontpage'
import { Post, PostCreator } from './components/posts.js';
import {SignIn} from "./components/auth.js";
import {SignUp} from "./components/auth.js";

const Routes = () => {
    return(
    <Switch>
        <Route exact path="/" component={Frontpage}></Route>
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/upload" render={() => <PostCreator onPostCreate={(postId) => console.log("Post created", postId)} currentUserId="aTSKynFlfWP1AGWkjdGsndlgIXi2"/>} />
        <Route path="/feed" render={() => <Post postId="-Ma_8hv3-wFTqCjCHw3U" currentUserId="aTSKynFlfWP1AGWkjdGsndlgIXi2" />}/>
    </Switch>
    );
};

export default Routes;




  //other routes are needed for the other pages ppl are making --Rowan

