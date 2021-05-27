import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';





class Frontpage extends Component
{
    render()
    {
        return(
        <div>
            <header>Welcome To *insert app title here*</header>
            <Link to="/posts">Posts</Link>,
            <Link to="/my-profile">Your Profile</Link>
        </div>
        );
    }

}

export default Frontpage;

