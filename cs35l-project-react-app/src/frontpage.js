import React, { Component } from 'react';
import { Link } from 'react-router';




class Frontpage extends Component
{
    state = {

    }

    render()
    {
        <div>
            <header>Welcome To *insert app title here*</header>
            <Link to="/posts">Posts</Link>,
            <Link to="/my-profile">Your Profile</Link>
        </div>
    }

}

