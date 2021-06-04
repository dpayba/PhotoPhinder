import React from 'react';
import { firebase, storage } from '../firebase';
import db from '../firebase';
import {
    Box,
    Card,
    Media,
    Heading,
    Content,
    Button,
    Columns,
    Navbar,
} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretRight,
    faCaretLeft,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CustomNavbar from './navbar.js';

class Post extends React.Component {
    render() {
        var likeButton;
        if (this.props.currentUserHasLiked) {
            likeButton = (
                <Button
                    className="has-text-danger"
                    onClick={() => this.props.removeCurrentUserLike()}
                >
                    <FontAwesomeIcon
                        style={{ paddingRight: '4px' }}
                        icon={faThumbsUp}
                    />{' '}
                    Like
                </Button>
            );
        } else {
            likeButton = (
                <Button
                    className="has-text-grey"
                    onClick={() => this.props.addCurrentUserLike()}
                >
                    <FontAwesomeIcon
                        style={{ paddingRight: '4px' }}
                        icon={faThumbsUp}
                    />{' '}
                    Like
                </Button>
            );
        }

        return (
            <div>
                <Card>
                    <Card.Image
                        size="4by3"
                        src={this.props.imgUrl}
                        alt="Post Image"
                    />
                    <Card.Content>
                        <Media.Item>
                            <Heading size={4}>
                                {this.props.creatorUsername}
                            </Heading>
                        </Media.Item>

                        <Content>
                            <p>likes: {Object.keys(this.props.likes).length}</p>
                            <Columns centered>
                                <Columns.Column>{likeButton}</Columns.Column>
                            </Columns>
                        </Content>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loading: true,
            postIndex: 0,
        };
    }

    fetchPostImg(postId) {
        return storage
            .ref('images/post-images')
            .child(`${postId}.jpg`)
            .getDownloadURL();
    }

    fetchForeignInformationForPosts(posts) {
        /* this fetches information for each post that is not present within
         * the actual post instance in the db. For example, the image for
         * post is stored in firebase storage, not the db, and this function
         * fetches that. It also fetches the username of the creator of the
         * post, by looking up the user with the id of post.creatorId in the
         * db */
        var imgFetchTasks = [];
        for (var post of posts) {
            imgFetchTasks.push(this.fetchPostImg(post.id));
        }
        return Promise.all(imgFetchTasks) // wait for all images to be fetched
            .then((imgUrls) => {
                console.assert(imgUrls.length === posts.length);
                for (var i = 0; i < imgUrls.length; i++) {
                    posts[i].imgUrl = imgUrls[i];
                }
                var creatorFetchTasks = [];
                for (var post of posts) {
                    creatorFetchTasks.push(
                        db.ref('users').child(post.creatorId).get(),
                    );
                }

                // wait for all usernames (of the creators of the posts) to
                // be fetched
                return Promise.all(creatorFetchTasks).then((snapshots) => {
                    console.assert(snapshots.length === posts.length);

                    for (var i = 0; i < snapshots.length; i++) {
                        posts[i].creatorUsername = snapshots[i].val().username;
                    }

                    for (post of posts) {
                        post.likes = post.likes === undefined ? {} : post.likes;
                    }

                    this.setState({
                        posts,
                        loading: false,
                    });
                });
            });
    }

    fetchAllPostInstances() {
        /* this gets all post instances in the database and passes the response
         * to this.fetchForeignInformationForPosts to get the remaining data
         * for the posts */

        // const response = await db.ref('posts').orderByChild('timeCreated').limitToLast(15).get();
        // ^^ use this if we decide to paginate the posts
        return db
            .ref('posts')
            .orderByChild('timeCreated')
            .get()
            .then((snapshot) => {
                const postsObj = snapshot.val(); // sorted object by ascending timeCreated
                const posts = Object.keys(postsObj)
                    .sort()
                    .reverse()
                    .map((key) => ({ ...postsObj[key], id: key })); // sorted array by descending timeCreated
                return this.fetchForeignInformationForPosts(posts);
            });
    }

    fetchPostInstancesCreatedByUser(userId) {
        /* similar to this.fetchAllPostInstances() except it gets post that were
         * created by the user with id == userId. */

        // const response = await db.ref('posts').orderByChild('timeCreated').limitToLast(15).get();
        // ^^ use this if we decide to paginate the posts

        return db
            .ref('posts')
            .orderByChild('creatorId')
            .equalTo(userId)
            .get()
            .then((snapshot) => {
                const postsObj = snapshot.val();
                if (!postsObj) {
                    return Promise.resolve();
                }



                var posts = Object.keys(postsObj).map((key) => ({
                    ...postsObj[key],
                    id: key,
                }));

                posts.sort((post) => post.id);
                posts.reverse(); // sorted array by descending timeCreated

                return this.fetchForeignInformationForPosts(posts);
            });
    }

    componentDidMount() {
        if (this.props.createdByUser)
            return this.fetchPostInstancesCreatedByUser(
                this.props.createdByUser,
            );
        else return this.fetchAllPostInstances();
    }

    currentUserHasLiked(post) {
        return firebase.auth().currentUser.uid in post.likes;
    }

    addCurrentUserLike(postId) {
        /* find post with id == postId, update the likes for
         * it, and send a request to the db to do the same */

        var postIndex;

        for (var i = 0; i < this.state.posts.length; i++) {
            if (this.state.posts[i].id === postId) postIndex = i;
        }

        console.assert(
            postIndex !== undefined,
            `post with id ${postId} not found`,
        );

        if (this.currentUserHasLiked(this.state.posts[postIndex])) {
            return;
        }

        var posts = this.state.posts.slice();
        var likes = posts[postIndex].likes;
        likes[firebase.auth().currentUser.uid] = true;

        posts[postIndex].likes = likes;

        return db
            .ref('posts')
            .child(posts[postIndex].id)
            .child('likes')
            .set(likes)
            .then((val) => {
                this.setState({
                    posts,
                });
            });
    }

    removeCurrentUserLike(postId) {
        /* find post with id == postId, update the likes for
         * it, and send a request to the db to do the same */
        var postIndex;

        for (var i = 0; i < this.state.posts.length; i++) {
            if (this.state.posts[i].id === postId) postIndex = i;
        }

        console.assert(
            postIndex !== undefined,
            `post with id ${postId} not found`,
        );

        if (!this.currentUserHasLiked(this.state.posts[postIndex])) {
            return;
        }

        var posts = this.state.posts.slice();
        var likes = posts[postIndex].likes;
        delete likes[firebase.auth().currentUser.uid];

        posts[postIndex].likes = likes;

        return db
            .ref('posts')
            .child(posts[postIndex].id)
            .child('likes')
            .set(likes)
            .then((val) => {
                this.setState({
                    posts,
                });
            });
    }

    clickLeft() {
        if (this.state.postIndex == 0) {
            return;
        } else {
            this.setState({
                postIndex: this.state.postIndex - 1,
            });
        }
    }

    clickRight() {
        if (this.state.postIndex == this.state.posts.length - 1) {
            return;
        } else {
            this.setState({
                postIndex: this.state.postIndex + 1,
            });
        }
    }

    render() {
        const posts = this.state.posts.map((postData) => (
            <Post
                {...postData}
                currentUserHasLiked={this.currentUserHasLiked(postData)}
                removeCurrentUserLike={() =>
                    this.removeCurrentUserLike(postData.id)
                }
                addCurrentUserLike={() => this.addCurrentUserLike(postData.id)}
                key={postData.id}
            />
        ));

        const leftButtonDisabled = this.state.postIndex === 0;
        const rightButtonDisabled =
            this.state.postIndex === this.state.posts.length - 1;

        return (
            <div>
                <Columns centered className="is-vcentered">
                    <Columns.Column>
                        <Button
                            disabled={leftButtonDisabled}
                            onClick={() => this.clickLeft()}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                        </Button>
                    </Columns.Column>

                    <Columns.Column>
                        {posts[this.state.postIndex]}
                    </Columns.Column>

                    <Columns.Column>
                        <Button
                            disabled={rightButtonDisabled}
                            onClick={() => this.clickRight()}
                        >
                            <FontAwesomeIcon icon={faCaretRight} size="lg" />{' '}
                        </Button>
                    </Columns.Column>
                </Columns>
            </div>
        );
    }
}

class MainFeed extends React.Component {
    render() {
        return (
            <div>
                <CustomNavbar />
                <div>
                    <Feed />
                    <p>&nbsp;</p>
                    <Button className="is-info">
                        <Link class="button is-info" to="/upload">
                            Create a Post
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}

class PostCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            img: null,
            name: 'No file chosen',
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

    getFileName(e) {
        if (e.target.files[0]) {
            this.setState({
                name: e.target.files[0].name,
            });
        }
    }

    helperFunc(e) {
        this.handleFileInput(e);
        this.getFileName(e);
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
            creatorId: firebase.auth().currentUser.uid,
            timeCreated: +new Date(), // timestamp for current time
        });
        const postId = post.key;

        return this.uploadInstanceImg(postId).then(() => {
            this.props.history.push('/feed');
        });
    }

    render() {
        return (
            <div>
                <CustomNavbar />

                <Box style={{ width: 800, margin: 'auto' }}>
                    <Heading>
                        <Columns centered>
                            <Columns.Column>Upload a Photo</Columns.Column>
                        </Columns>
                    </Heading>

                    <Columns centered>
                        <Columns.Column size="half">
                            <div class="file has-name">
                                <label class="file-label">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                        class="file-input"
                                        type="file"
                                        name="resume"
                                        onChange={(e) => this.helperFunc(e)}
                                    ></input>
                                    <span class="file-cta">
                                        <span class="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span class="file-name">
                                        {this.state.name}
                                    </span>
                                </label>
                            </div>
                        </Columns.Column>
                    </Columns>

                    <Columns centered>
                        <Columns.Column size="half">
                            <Button.Group>
                                <Button
                                    className="is-info"
                                    fullwidth
                                    rounded
                                    color="primary"
                                    onClick={() => this.createPost()}
                                >
                                    Post
                                </Button>
                            </Button.Group>
                        </Columns.Column>
                    </Columns>
                </Box>
            </div>
        );
    }
}

export { Post, PostCreator, Feed, MainFeed };
