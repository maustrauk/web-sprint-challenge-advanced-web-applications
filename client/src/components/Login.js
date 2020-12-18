import React, { useState } from "react";
import axios from 'axios';

const Login = props => {
  const [userData, setUserData] = useState({username: "", password: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({message: "", isError: false});

  const changeHandler = (event) => {
      const { name , value } = event.target;
      setUserData({...userData, [name]: value });
  };

  const login = (event) => {
      event.preventDefault();
      setIsLoading(true);
      axios
      .post("http://localhost:5000/api/login", userData)
      .then(res => {
          localStorage.setItem("token", res.data.payload);
          props.history.push('/BubblesPage');
          setIsLoading(false);
      })
      .catch(err => {
         if (err.response) {
             console.log(err.response.data);
             if (err.response.status === 403) {
                 setErrorMessage({message: "Username and/or password incorrect", isError: true});
              }
         } else {
          setErrorMessage({message: err.message, isError: true});
         }
         setIsLoading(false);
      })
  }




  return (<div className="login container-fluid w-50 mt-5 ">
      <h1 className="display-1 mt-3 text-center"> Login Page</h1>
      <form >
          <div className="form-group">
              <label htmlFor="usernameInput">Username:</label>
              <input name="username"
              id="usernameInput"
              className="form-control"
              type="text"
              placeholder="Enter username"
              onChange={changeHandler}
              value={userData.username}
              aria-describedby="usernameError" />
              <small id="usernameError" className="form-text text-muted">{errorMessage.message}</small>
          </div>
          <div className="form-group">
              <label htmlFor="passwordInput"> Password:</label>
              <input name="password"
              id="passwordInput"
              className="form-control"
              type="text"
              placeholder="Enter password"
              onChange={changeHandler}
              value={userData.password}
              aria-describedby="passwordError" />
              <small id="passwordError" className="form-text text-muted">{errorMessage.message}</small>
          </div>
          {isLoading ? <div className="spinner-border"></div> : <button type="button" className="btn btn-primary" onClick={login}>login</button>}
      </form>
  </div>)
};

export default Login;
