import { firebase } from '../firebase';
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
                // Signed in
                var user = userCredential.user;
                // this user variable will be used in most other functionality

                this.props.onSignIn(user); 
                // ^ this line is for the example in example.js

                console.log('Signed in:', user);
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
                <button onClick={() => {
                    this.submit();
                    //this.props.history.push("/upload");
                }
                }>Sign In</button>
                <br/>
                <button
                    onClick={() => { 
                        this.props.history.push("/signup");
                    }}
                >Sign Up</button>
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
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                console.log('Signed in:', user);
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
                <button onClick={() => this.submit()}>Sign Up</button>
                <br/>
                <button
                    onClick={() => { 
                        this.props.history.push("/login");
                    }}
                >Back To Login</button>
            </div>
        );
    }
}

export { SignIn, SignUp };
