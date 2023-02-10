import { useRef, useState, useEffect } from "react";
// import { useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';

import axios from "../api/axios";
const LOGIN_URL = "/api/auth";

const Login = () => {
  const { setAuth } = useStateContext ();

  const userRef = useRef();
  const errRef = useRef();

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/movies";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL, { 
          email: user, 
          password: pwd 
        });

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data.token;
      const role = response?.data.role;

      setAuth({ user, pwd, accessToken, role});
      setUser("");
      setPwd("");

      window.localStorage.setItem("token", JSON.stringify(response.data.token));
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("isAdmin", role);
      
      // navigate(from, { replace: true });
      window.location.href = '/movies';
    } 
    
    catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username or Password Wrong");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login-container">
        <section className="login-section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="login-button">Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="/register">Sign Up</a>
            </span>
          </p>
        </section>
    </div>
  )
}

export default Login;
