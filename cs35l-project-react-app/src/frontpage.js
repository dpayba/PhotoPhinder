import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import {
    Button,
    Form,
    Columns,
    Card,
    Navbar,
    Box,
    Heading,
} from 'react-bulma-components';
import './App.css';




class Frontpage extends Component
{
    render()
    {
        return(
        <div id="page-container">
            <header className="App-header">Welcome To *insert app title here*</header>
            <p>&nbsp;</p>
            <Link class="button is-primary" to="/feed">Browse Photos</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="button is-primary" to="/my-profile">Your Profile</Link>
            <footer className="App-footer">*insert Copyright + Our Names*&nbsp;&nbsp;&nbsp;&nbsp;</footer>
        </div>
        );
    }

}

export default Frontpage;

//add links as needed --Rowan

