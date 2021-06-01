import { firebase } from '../firebase';
import db from '../firebase';
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
import { Link } from 'react-router-dom';
import React from 'react';

/*
 * Simple implementation of sign in and sign up component,
 * to show how to sign in using firebase once form fields
 * have been collected.
 *
 * For a more robust auth solution, looking at this guy's
 * repository may help:
 * https://github.com/TallanGroberg/firebase-auth-tutorial
 *
 * */

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }

    handleEmailInput(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordInput(event) {
        this.setState({ password: event.target.value });
    }

    submit() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                var user = userCredential.user;

                /* if another redirect location has been specified, go there.
                 * otherwise, go to /feed */
                if (
                    this.props.location.state &&
                    this.props.location.state.from
                ) {
                    this.props.history.push(this.props.location.state.from);
                } else {
                    this.props.history.push('/feed');
                }

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Error:', errorCode, errorMessage);
            });
    }

    render() {
        return (
            <div> 
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
                                <Link className="button is-primary" to="/my-profile">My Profile</Link>
                            </Navbar.Item>
                        </Navbar.Container>

                        <Navbar.Container align="end">
                            <Navbar.Item href ="#">
                                <Link className="button is-primary" to="/login">Login/Signup/Logout</Link>
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>

                <Box style={{ width: 800, margin: 'auto' }}>

                <Heading>
                <Columns centered>
                    <Columns.Column>
                        Sign In
                    </Columns.Column>
                </Columns>

                </Heading>

                <Columns centered>
                    <Columns.Column size="half">
                        <Form.Field>
                            <Form.Label>Email</Form.Label>
                            <Form.Control>
                                <Form.Input
                                placeholder="example@email.com"
                                color="success"
                                value={this.state.email}
                                onChange={this.handleEmailInput}
                                />
                            </Form.Control>
                            </Form.Field> 
                    </Columns.Column>

                </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Form.Field>
                            <Form.Label>Password</Form.Label>
                            <Form.Control>
                                <Form.Input
                                placeholder="Password"
                                type="password"
                                color="success"
                                value={this.state.password}
                                onChange={this.handlePasswordInput}
                                />
                            </Form.Control>
                            </Form.Field> 
                    </Columns.Column>               
                </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Button.Group>
                            <Button 
                            fullwidth
                            rounded 
                            color="primary"
                            onClick={() => this.submit()}
                            >
                                Submit
                            </Button>
                        </Button.Group>
                    </Columns.Column>
                </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Button.Group>
                            <Button 
                            fullwidth
                            rounded 
                            color="secondary"
                            onClick={() => { this.props.history.push('/signup'); } }
                            >
                                Sign Up instead
                            </Button>
                        </Button.Group>
                    </Columns.Column>
                </Columns>

                </Box>
            
            </div>
        )
    }
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
        };
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
    }

    handleEmailInput(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordInput(event) {
        this.setState({ password: event.target.value });
    }

    handleUsernameInput(event) {
        this.setState({ username: event.target.value });
    }

    submit() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password,
            )
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;

                // create profile instance in db with username
                db.ref('users')
                    .child(user.uid)
                    .set({ username: this.state.username });

                this.props.history.push('/feed');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Error:', errorCode, errorMessage);
            });
    }

    render() {
        return (
            <div>
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
                                <Link className="button is-primary" to="/my-profile">My Profile</Link>
                            </Navbar.Item>
                        </Navbar.Container>

                        <Navbar.Container align="end">
                            <Navbar.Item href ="#">
                                <Link className="button is-primary" to="/login">Login/Signup/Logout</Link>
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>

                <Box style={{ width: 800, margin: 'auto' }}>
                
                <Heading>
                <Columns centered>
                    <Columns.Column>
                        Signing up has never been easier.
                    </Columns.Column>
                </Columns>

                </Heading>

                <Columns centered>
                    <Columns.Column size="half">
                        <Form.Field>
                            <Form.Label>Email</Form.Label>
                            <Form.Control>
                                <Form.Input
                                placeholder="example@email.com"
                                color="success"
                                value={this.state.email}
                                onChange={this.handleEmailInput}
                                />
                            </Form.Control>
                            </Form.Field> 
                    </Columns.Column>

                </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Form.Field>
                            <Form.Label>Username</Form.Label>
                            <Form.Control>
                                <Form.Input
                                placeholder="Username"
                                color="success"
                                value={this.state.username}
                                onChange={this.handleUsernameInput}
                                />
                            </Form.Control>
                            </Form.Field> 
                    </Columns.Column> </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Form.Field>
                            <Form.Label>Password</Form.Label>
                            <Form.Control>
                                <Form.Input
                                placeholder="Password"
                                type="password"
                                color="success"
                                value={this.state.password}
                                onChange={this.handlePasswordInput}
                                />
                            </Form.Control>
                            </Form.Field> 
                    </Columns.Column>               
                </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Button.Group>
                            <Button 
                            fullwidth
                            rounded 
                            color="primary"
                            onClick={() => this.submit()}
                            >
                                Sign Up
                            </Button>
                        </Button.Group>
                    </Columns.Column>
                </Columns>

                <Columns centered>
                    <Columns.Column size="half">
                        <Button.Group>
                            <Button 
                            fullwidth
                            rounded 
                            color="secondary"
                            onClick={() => { this.props.history.push('/login'); } }
                            >
                                Login instead
                            </Button>
                        </Button.Group>
                    </Columns.Column>
                </Columns>

                </Box>
            </div>
        );
    }
}

export { SignIn, SignUp };
