import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage inventory.</p>
    <button
      className="github"
      onClick={() => {
        props.authenticate();
      }}
    >
      Sign In
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};
export default Login;
