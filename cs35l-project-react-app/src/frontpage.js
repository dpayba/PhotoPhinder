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
                            <Link class="button is-primary" to="/">About Us</Link>
                        </Navbar.Item>
                    </Navbar.Brand>
                    
                    <Navbar.Menu>
                        <Navbar.Container>
                            <Navbar.Item href="#">
                                <Link className="button is-primary" to="/feed">Browse Photos</Link>
                            </Navbar.Item>

                            <Navbar.Item href="#">
                                <Link className="button is-primary" to="/profile">My Profile</Link>
                            </Navbar.Item>
                        </Navbar.Container>

                        <Navbar.Container align="end">
                            <Navbar.Item href ="#">
                                <Link className="button is-primary" to="/login">Login/Signup/Logout</Link>
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>

                </Navbar>
            <p>&nbsp;</p>
            <div class="content is-large">
                <h1>Welcome to PhotoPhinder!</h1>
                <p>We at PhotoPhinder are dedicated to finding great matches for all your photography needs!<br></br>
                Whether you're a photographer looking for work, a business who needs professional photography done,<br></br>
                or just someone looking to get their photos taken, we've got you covered.</p>
                <figure>
                    <img src="https://images.pexels.com/users/avatars/43594/andre-furtado-333.jpeg?auto=compress&fit=crop&h=256&w=256"></img>
                    <figcaption class="content is-medium">
                        Just an example of some of the wonderful people you can find on our site!
                    </figcaption>
                </figure>
            </div>
            <p>&nbsp;</p>
            <footer className="App-footer">Armaan Abraham, Rowan McKereghan, Uniss Tan, Aaron Seo, Kelly Chan, and Dane Payba. ©2021&nbsp;&nbsp;&nbsp;&nbsp;</footer>
        </div>
        );
    }

}

export default Frontpage;

//add links as needed --Rowan