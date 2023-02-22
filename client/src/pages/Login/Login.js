import { useRef, useState, useEffect } from "react";
import "./login.css";

import axios from "../../api/axios";
const LOGIN_URL = "/api/auth";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

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

      // const accessToken = response?.data.token;
      const role = response?.data.role;

      // setAuth({ user, pwd, accessToken, role});
      setUser("");
      setPwd("");

      window.localStorage.setItem("token", JSON.stringify(response.data.token));
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("isAdmin", role);
      window.localStorage.setItem("email", user);

      // navigate(from, { replace: true });
      window.location.href = '/';
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
    <div className="parent-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <form className="box" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p className="text-muted" ref={errRef}>
                  {" "}
                  Please enter your login and password!
                </p>
                <p
                  ref={errRef}
                  className={errMsg ? "show" : "hide"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <input 
                type="text" 
                placeholder="User Email"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                />
                <input 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required 
                />
                <a className="forgot text-muted" href="#">
                  Forgot password?
                </a>
                <input type="submit" value="Login" href="#" />
                <div className="col-md-12">
                  <ul className="social-network social-circle">
                    <li>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className="icoFacebook"
                        title="Facebook"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/"
                        className="icoTwitter"
                        target="_blank"
                        rel="noreferrer"
                        title="Twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://accounts.google.com"
                        className="icoGoogle"
                        target="_blank"
                        rel="noreferrer"
                        title="Google +"
                      >
                        <i className="fab fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="signupText mt-3">
                  Not a member?
                  <span>
                    <a href="/register"> Sign Up</a>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
