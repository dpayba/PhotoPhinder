import { Post, PostCreator } from './components/posts.js';
import { SignIn } from './components/auth.js';
import Routes from './routes';

const App = () => {
    return (
        <div className="App">
            <Routes />
        </div>
    );
};

export default App;

//each page should have its own header
