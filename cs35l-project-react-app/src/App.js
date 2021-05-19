import Main from './example.js';

const App = () => {
    return (
        <div>
            <Main />
        </div>
    );
};


export default withAuthenticator(App);
/* provides login functionality for the entire app 
 * see https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#enable-sign-up-sign-in-and-sign-out 
 * The Amplify docs say that we can customize login and signup frontend 
 * functionality. I initially wanted a way to login by just providing email and password, without any email
 * verification. But after a few hours of trying that I gave up. Amplify made it hard and I don't think it's 
 * that bad of a thing to require email verification. 
 *
 * One thing we can definitely do to customize the login and signup screen is to just do some custom css to 
 * modify the imported ui components as described here: https://docs.amplify.aws/ui/customization/theming/q/framework/react.
 * 
 * */
