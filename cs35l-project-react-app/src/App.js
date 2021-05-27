import { Post, PostCreator } from './components/posts.js';
import { SignIn } from './components/auth.js';
import Routes from './routes';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">Sample Header</header>
            <Routes />
        </div>
    );
};

export default App;
