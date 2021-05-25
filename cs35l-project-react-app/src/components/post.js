class Post extends React.Component {
    /* */
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            imgId: "",
            nLikes: null,
        };
    }
    
    renderPost() {


    }


    async handleSignIn(user) {
        this.setState({
            user: user,
        });

        var todoIdsRef = db.ref(`users/${user.uid}/todos`);

        const self = this;

        todoIdsRef.on('value', (todoIdsSnapshot) => {
            var newTodos = [];
            var todoIds = todoIdsSnapshot.val(); // todo ids that relate to current user
            if (todoIds) {
                var promises = [];

                // fetch info for each todo that is associated to the current user
                for (let id in todoIds) {
                    var todoRef = db.ref(`todos/${id}`);
                    promises.push(todoRef.once('value', (todoSnapshot) => {
                        var todo = todoSnapshot.val();
                        newTodos.push(todo);
                    }));
                }

                // Wait for all fetches of data to return, and then update state
                Promise.all(promises)
                    .then(() => {
                        self.setState({
                            todos: newTodos,
                        });
                    });
            }
        });
    }

}
