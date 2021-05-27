import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Frontpage extends React.Component
{
    render()
    {
        return(
        <div>
            <header className="App-header">Welcome To *insert app title here*</header>
            <Link className="App" to="/feed"> Browse Photos  </Link>,
            <Link className="App" to="/profile">  Your Profile  </Link>,
            {/* Will eventually need to change profile url to dynamic user */}
            <Link className="App" to="/login">  Login  </Link>,
            <Link className="App" to="/signup">  Sign Up </Link>
            <footer>*insert Copyright + Our Names*</footer>
        </div>
        );
    }

}

export {Frontpage};

//add links as needed --Rowan

