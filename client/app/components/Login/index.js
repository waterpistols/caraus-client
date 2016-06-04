import React from 'react';
import {Link} from 'react-router';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/">Homes</Link>
                <hr />
                {this.props.children}
            </div>
        );
    }
}

export default Login;