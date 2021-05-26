import React from 'react';
import { storage } from '../firebase';
import db from '../firebase';

class Post extends React.Component {
    constructor(props) {
        super(props);
        /* it's possible that we will need to 
         * move this state to a higher level 
         * component eventually.
         * For now, this component takes care
         * of fetching data for a post from 
         * the database given the post's id
         * and the auth user's id.
         *
         * We can also add a caption, etc.
         * */
        this.state = {
            imgUrl: '',
            likes: {},
            loading: true,
            creatorUsername: '',
        };
        this.instanceDbRef = db.ref('posts').child(this.props.postId); 
        /* keep the key in the database for the current post for easy access */
    }

    async fetchInstanceData() {
        const response = await this.instanceDbRef.get();
        const payload = response.val();
        const imgUrl = await storage
            .ref('images/post-images')
            .child(`${this.props.postId}.jpg`)
            .getDownloadURL();
        const creatorDataResponse = await db
            .ref('users')
            .child(payload.creatorId)
            .get();
        const creatorUsername = creatorDataResponse.val().username;
        this.setState({
            imgUrl,
            likes: payload.likes === undefined ? {} : payload.likes,
            loading: false,
            creatorUsername,
        });
    }

    currentUserHasLiked() {
        return this.props.currentUserId in this.state.likes;
    }

    async addCurrentUserLike() {
        if (this.currentUserHasLiked()) {
            return;
        }
        console.log('Add current user like called');
        var likes = JSON.parse(JSON.stringify(this.state.likes));
        likes[this.props.currentUserId] = true;
        await this.instanceDbRef.child('likes').set(likes);
        this.setState({
            likes,
        });
    }

    async removeCurrentUserLike() {
        if (!this.currentUserHasLiked()) {
            return;
        }
        console.log('Remove current user like called');
        var likes = JSON.parse(JSON.stringify(this.state.likes));
        delete likes[this.props.currentUserId];
        await this.instanceDbRef.child('likes').set(likes);
        this.setState({
            likes,
        });
    }

    componentDidMount() {
        this.fetchInstanceData();
    }

    render() {
        return (
            <div>
                {/* styling and formatting of this
                    can be redone. what's shown
                    below is for demo purposes */}
                <p>{this.state.creatorUsername}</p>
                <img src={this.state.imgUrl} alt="Post Image" />
                <p>likes: {Object.keys(this.state.likes).length}</p>
                <p>loading: {String(this.state.loading)}</p>
                <p>currentUserHasLiked: {String(this.currentUserHasLiked())}</p>
                <button onClick={() => this.addCurrentUserLike()}>Like</button>
                <button onClick={() => this.removeCurrentUserLike()}>
                    Unlike
                </button>
            </div>
        );
    }
}

class PostCreator extends React.Component {
    constructor(props) {
        super(props); // must pass in auth user id 

        this.state = {
            loading: false,
            img: null,
            // other post fields, (e.g. caption)
        };
    }

    handleFileInput(e) {
        // using logic from file-upload.js
        if (e.target.files[0]) {
            this.setState({
                img: e.target.files[0],
            });
        }
    }

    uploadInstanceImg(instanceId) {
        const metadata = {
            contentType: 'image/jpeg', // convert uploaded image into jpeg
        };
        return storage
            .ref(`images/post-images/${instanceId}.jpg`)
            .put(this.state.img, metadata);
    }

    createPost() {
        const post = db.ref('posts').push({
            creatorId: this.props.currentUserId,
        });
        const postId = post.key;

        return this.uploadInstanceImg(postId).then(() => {
            this.props.onPostCreate(postId); 
            /* Signal to parent component that we're done 
             * creating the post. Give the parent the postId.
             * */
        });
    }

    render() {
        return (
            <div>
                {/* styling and formatting of this
                    can be redone. what's shown
                    below is for demo purposes */}
                <input type="file" onChange={(e) => this.handleFileInput(e)} />
                <br />
                <button onClick={() => this.createPost()}>Post</button>
            </div>
        );
    }
}

export { Post, PostCreator };
