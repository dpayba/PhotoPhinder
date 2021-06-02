import React from 'react';
import {
    Card,
    Media,
    Heading,
    Content,
    Button,
    Columns,
    Navbar,
} from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CustomNavbar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand>
                    <Navbar.Item href="#">
                        <Link class="button is-primary" to="/">
                            About Us
                        </Link>
                    </Navbar.Item>
                </Navbar.Brand>

                <Navbar.Menu>
                    <Navbar.Container>
                        <Navbar.Item href="#">
                            <Link className="button is-primary" to="/feed">
                                Browse Photos
                            </Link>
                        </Navbar.Item>

                        <Navbar.Item href="#">
                            <Link className="button is-primary" to="/profile">
                                My Profile
                            </Link>
                        </Navbar.Item>

                        <Navbar.Item href="#">
                            <Link className="button is-primary" to="/search">
                                <FontAwesomeIcon icon={faSearch} />                                
                            </Link>
                        </Navbar.Item>
                    </Navbar.Container>

                    <Navbar.Container align="end">
                        <Navbar.Item href="#">
                            <Link className="button is-primary" to="/login">
                                Login/Signup/Logout
                            </Link>
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}

export default CustomNavbar;
