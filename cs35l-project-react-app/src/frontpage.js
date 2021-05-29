import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';





class Frontpage extends Component
{
    render()
    {
        return(
        <div id="page-container">
            <header className="App-header">Welcome To *insert app title here*</header>
            <p></p>
            <Link className="App" to="/feed">Browse Photos</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="App" to="/my-profile">Your Profile</Link>
            <footer className="App-footer">*insert Copyright + Our Names*&nbsp;&nbsp;&nbsp;&nbsp;</footer>
        </div>
        );
    }

}

export default Frontpage;

//add links as needed --Rowan

