import React from 'react';
import { firebase } from '../firebase';
import db from '../firebase';
import { Feed } from './posts.js';
import {
    Card,
    Media,
    Heading,
    Content,
    Button,
    Columns,
    Navbar,
} from 'react-bulma-components';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

class CurrentUserProfile extends React.Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <Navbar.Item href="#">AppName</Navbar.Item>
                    </Navbar.Brand>

                    <Navbar.Menu>
                        <Navbar.Container>
                            <Navbar.Item href="#">Feed</Navbar.Item>

                            <Navbar.Item href="#">My Profile</Navbar.Item>

                            <Navbar.Item href="#">Something idk</Navbar.Item>
                        </Navbar.Container>

                        <Navbar.Container align="end">
                            <Navbar.Item href="#">
                                Login/Signup/Logout
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>

                <div className="has-text-centered">
                    <p className="is-size-1 mb-3 mt-0 pt-0">My Posts</p>
                </div>

                <Feed createdByUser={firebase.auth().currentUser.uid} />
            </div>
        );
    }
}

class OtherUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };

    }

    componentDidMount() {
        this.fetchUsername();
    }

    fetchUsername() {
        return db
            .ref('users')
            .child(this.props.match.params.uid)
            .get()
            .then((snapshot) => {
                const response = snapshot.val();
                this.setState({
                    username: response.username,
                });
            });
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <Navbar.Item href="#">AppName</Navbar.Item>
                    </Navbar.Brand>

                    <Navbar.Menu>
                        <Navbar.Container>
                            <Navbar.Item href="#">Feed</Navbar.Item>

                            <Navbar.Item href="#">My Profile</Navbar.Item>

                            <Navbar.Item href="#">Something idk</Navbar.Item>
                        </Navbar.Container>

                        <Navbar.Container align="end">
                            <Navbar.Item href="#">
                                Login/Signup/Logout
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                </Navbar>

                <div className="has-text-centered">
                    <p>Showing posts for</p>
                    <p className="is-size-1 mb-3 mt-0 pt-0">
                        {this.state.username}
                    </p>
                </div>

                <Feed createdByUser={firebase.auth().currentUser.uid} />
            </div>
        );
    }
}

export { CurrentUserProfile, OtherUserProfile };
