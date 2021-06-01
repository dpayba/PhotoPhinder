import React from 'react';
import { auth } from '../firebase';
import db from '../firebase';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            chats: [],
            readError: null,
            writeError: null
        };

        this.handleChange = this.hangleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({ readError: null });
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                })
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }
}

