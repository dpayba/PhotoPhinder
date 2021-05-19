import { SignIn } from './components/auth';
import db from './firebase.js';
import React from 'react';

/*
 * To try this example out, add the component exported
 * in this file to App.js. Then, once the server is running,
 * sign in with credentials: 
 * test@g.com
 * asdfsdfg
 * We do have a simple signup component, but I did not add it 
 * here. 
 *
 *
 * The following is a demo that I did to try and learn
 * about firebase's database structure. Firebase's "realtime database" is
 * a key-value database (can be thought of as just a big JSON tree). 
 * I created a simple todo app with a one-to-many relationship
 * between todos and users. The structure is as so:
 *
 * users:
 *  uid1: 
 *      todos:
 *          todoid1: true,
 *          todoid2: true,
 *  uid2: 
 *      todos: 
 *          todoid3: true,
 *          todoid4: true,
 *
 * todos:
 *  todoid1:
 *      name: '',
 *      description: '',
 *  todoid2:
 *      name: '',
 *      description: ''
 * ...
 * 
 * The structure could have also been like this though:
 *
 * users:
 *  uid1:
 *      todos:
 *          todoid1: 
 *              name: '',
 *              description: '',
 *          todoid2: 
 *              name: '',
 *              description: '',
 *  uid2: 
 *      todos:
 *          ...
 *
 * 
 *
 * The first way (the one implemented here) does duplicate
 * some data, but it also reduces the size of the average 
 * db query (this would be more important if the todo model had more entries), 
 * and it allows future database models to have 
 * relationships to todos in an efficient way.
 *
 *
 * Read more about structuring data in firebase's key-value database here: 
 * https://firebase.google.com/docs/database/web/structure-data 
 *
 * About reading and writing data to firebase's realtime database:
 * https://firebase.google.com/docs/database/web/read-and-write
 *
 * About working with lists of data:
 * https://firebase.google.com/docs/database/web/lists-of-data
 *
 * */

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };
    }

    render() {
        return (
            <div style={styles.container}>
                <h2>Testing Todos</h2>

                <input style={styles.input} value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}   placeholder="Name" />
                <input style={styles.input} value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}  placeholder="Description" />
                <button onClick={() => this.props.addTodo(this.state.name, this.state.description)} style={styles.button}>
                    Create Todo
                </button>
                {this.props.todos.map((todo, index) => (
                    <div key={todo.id ? todo.id : index} style={styles.todo}>
                        <p style={styles.todoName}>{todo.name}</p>
                        <p style={styles.todoDescription}>{todo.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            user: {},
        };
        this.addTodo = this.addTodo.bind(this);
    }

    addTodo(name, description) {
        const itemsRef = db.ref('todos');
        var item = {
            user: this.state.user.uid, 
            // ^ so we can access the user from a todo (not used in this example though)
            name: name,
            description: description,
        };
        item = itemsRef.push(item);
        // add entry to todos ref in database tree, with
        // information about the todo

        var todoIdsRef = db.ref(`users/${this.state.user.uid}/todos`);
        todoIdsRef.child(item.key).set(true);
        // add id of todo to the todos list for current user
    }

    async handleSignIn(user) {
        this.setState({
            user: user,
        });

        // Find correct spot in database tree to watch
        var todoIdsRef = db.ref(`users/${user.uid}/todos`);

        const self = this;

        // Provide handler that triggers whenever firebase
        // detects a change in the database at spot in the
        // tree specified by todoIdsRef.
        // Since only one user at a time interacts with these
        // todos, this watcher isn't really needed in this example.
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

    render() {
        if (Object.keys(this.state.user).length)
            return (
                <div>
                    <Todos
                        addTodo={this.addTodo}
                        todos={this.state.todos}
                    />
                </div>
            );
        else return <SignIn onSignIn={(user) => this.handleSignIn(user)} />;
    }
}

const styles = {
    container: {
        width: 400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    todo: { marginBottom: 15 },
    input: {
        border: 'none',
        backgroundColor: '#ddd',
        marginBottom: 10,
        padding: 8,
        fontSize: 18,
    },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    button: {
        backgroundColor: 'black',
        color: 'white',
        outline: 'none',
        fontSize: 18,
        padding: '12px 0px',
    },
};

export default Main;
