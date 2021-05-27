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
            <Link className="App" to="/feed">Browse Photos</Link>,
            <Link className="App" to="/my-profile">Your Profile</Link>
            <footer>*insert Copyright + Our Names*</footer>
        </div>
        );
    }

}

export default Frontpage;

//add links as needed --Rowan

