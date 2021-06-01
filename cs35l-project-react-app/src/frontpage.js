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
            <Navbar>
                    <Navbar.Brand>
                        <Navbar.Item href="#">
                            <Link class="button is-primary" to="/feed">Browse Photos</Link>
                        </Navbar.Item>
                    </Navbar.Brand>
                    
                    <Navbar.Menu>
                        <Navbar.Container>
                            <Navbar.Item href="#">
                                <Link className="button is-primary" to="/my-profile">Feed</Link>
                            </Navbar.Item>

                            <Navbar.Item href="#">
                                <Link className="button is-primary" to="/my-profile">My Profile</Link>
                            </Navbar.Item>
                        </Navbar.Container>

                        <Navbar.Container align="end">
                            <Navbar.Item href ="#">
                                <Link className="button is-primary" to="/my-profile">Login/Signup/Logout</Link>
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>

                </Navbar>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <Heading>
                <Columns centered>
                    <Columns.Column>
                        Welcome to *insert app name here*
                    </Columns.Column>
                </Columns>
            </Heading>
            <p>&nbsp;</p>
            <footer className="App-footer">*insert Copyright + Our Names*&nbsp;&nbsp;&nbsp;&nbsp;</footer>
        </div>
        );
    }

}

export default Frontpage;

//add links as needed --Rowan

