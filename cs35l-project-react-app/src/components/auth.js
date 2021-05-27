import { firebase } from '../firebase';
import db from '../firebase';
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
                <label>
                    Email:
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailInput}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordInput}
                    />
                </label>
                <button
                    onClick={() => {
                        this.submit();
                    }}
                >
                    Sign In
                </button>
                <br />
                <button
                    onClick={() => {
                        this.props.history.push('/signup');
                    }}
                >
                    Sign Up
                </button>
            </div>
        );
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
                <label>
                    Email:
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailInput}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameInput}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordInput}
                    />
                </label>
                <button onClick={() => this.submit()}>Sign Up</button>
                <br />
                <button
                    onClick={() => {
                        this.props.history.push('/login');
                    }}
                >
                    Back To Login
                </button>
            </div>
        );
    }
}

export { SignIn, SignUp };
