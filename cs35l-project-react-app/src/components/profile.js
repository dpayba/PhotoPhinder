import React from 'react';
import { firebase } from '../firebase';
import db from '../firebase';
import { Feed } from './posts.js';

class Profile extends React.Component {
    render() {
        return (
            <div>
                {/* Can add more stuff to this page, just wanted to show
                    the feed logic works for specifying posts from a 
                    specific user */ }
                <Feed createdByUser={firebase.auth().currentUser.uid} />
            </div>
        );
    }
}

export default Profile;
