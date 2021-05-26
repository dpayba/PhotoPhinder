import { Post, PostCreator } from './components/posts.js';
import {SignIn} from "./components/auth.js";
import {SignUp} from "./components/auth.js";
//import {Upload} from "./components/file-upload.js";
//import {Posts} from "./components/posts.js";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
/* below is a demo of the Post and PostCreator components. For demo purposes,
 * I passed in a static postId and currentUserId of a preexisting post and user
 * for the Post component, and the userId of a preexisting user for the PostCreator
 * component. Check out components/posts for more information. 
 * */

const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/login" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                </Switch>
            </div>
        </Router>
            // <div>
            //     {/*<PostCreator onPostCreate={(postId) => console.log("Post created", postId)} currentUserId="aTSKynFlfWP1AGWkjdGsndlgIXi2"  /> */}
            //     <Post postId="-Ma_8hv3-wFTqCjCHw3U" currentUserId="aTSKynFlfWP1AGWkjdGsndlgIXi2"  /> 
            //  </div>
    );
};



export default App;
