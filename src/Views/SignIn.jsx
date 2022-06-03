import React from 'react'
import { useAuth } from '../Context/AuthProvider'


export const SignIn = () => {

  const { signIn, register } = useAuth();

  const handleSignIn = (e, providerOption) => {
    e.preventDefault();

    const { email, password } = e.target;
    signIn({ email, password }, providerOption);
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const data = e.target;

    const formData = {
      username: data.username.value,
      email: data.email.value,
      password: data.password.value,
      confirmPassword: data.confirm_password.value
    };
    console.log(formData)
    register(formData);
  };


  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Sign In</h2>
        <hr />
        <form onSubmit={(e) => handleSignIn(e, 'password')}>
          <div className="form-group">
            <input type="email" className="form-control" name="email" aria-describedby="helpId" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" aria-describedby="helpId" placeholder="Password" />
          </div>
          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" name="remember_me" value="checkedValue" />
                Remember Me
              </label>
            </div>
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Log In" />
          </div>
          <div className="form-group">
            <input
              onClick={(e) => handleSignIn(e, 'google')}
              className="btn btn-success"
              type="button"
              value="Sign in with Google" />
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <h2>Register</h2>
        <hr />
        <form onSubmit={handleRegistration}>
          <div className="form-group">
            <div className="row">
              <div className="col-12">
                <input type="text" className="form-control" name="username" aria-describedby="helpId" placeholder="Username" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" name="email" aria-describedby="helpId" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" aria-describedby="helpId" placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="confirm_password" aria-describedby="helpId" placeholder="Confirm Password" />
          </div>
          <input className="btn btn-success" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};