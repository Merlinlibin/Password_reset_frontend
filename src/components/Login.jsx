import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../styles/Login.css";
import { Oval } from "react-loader-spinner";

function Login({
  token,
  settoken,
  user,
  setuser,
  logobj,
  setlogobj,
  registered,
  setregistered,
}) {
  const loginUrl = "https://loginbackend-7ar3.onrender.com/api/login/";
  const passref = useRef("");
  const eyeref = useRef("");
  const errMailref = useRef("");
  const errpassref = useRef("");
  const [loading, setloading] = useState(false);

  const togglepass = () => {
    if (
      passref.current.type == "password" &&
      eyeref.current.className == "bi bi-eye-slash eye"
    ) {
      passref.current.type = "text";
      eyeref.current.className = "bi bi-eye eye";
    } else {
      passref.current.type = "password";
      eyeref.current.className = "bi bi-eye-slash eye";
    }
  };
  const userLogin = async () => {
    event.preventDefault();
    setloading(true);
    console.log("Logging in user...");

    try {
      const response = await axios.post(loginUrl, logobj);

      const data = await response.data;
      console.log(response);
      if (response.status === 200) {
        console.log("User logged in successfully");
        console.log(response.status);
        setlogobj({
          email: "",
          password: "",
        });
        settoken(data.token);
        setuser(data);

        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (e) {
      console.log("Error logging in...", e.response.status);
      if (e.response.status = 401) {
        errMailref.current.className = "errMail d-block";
        errpassref.current.className = "errpass d-block";
      }
    }
    setloading(false);
  };
  const handleregister = () => {
    event.preventDefault();
    setregistered(false);
  };
  return (
    <div className="main">
      <div className="container  sub">
        <h2 className="text-center my-4">Login Form</h2>
        <div className="row container">
          <form onSubmit={userLogin}>
            <div className="form-group my-3 ">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control my-2"
                placeholder="Enter email"
                value={logobj.email}
                onChange={(e) => {
                  setlogobj({ ...logobj, email: e.target.value });
                }}
              />
              <div className="errMail d-none" ref={errMailref}>
                email dosent exist please register!
              </div>
            </div>
            <div className="form-group my-3">
              <label htmlFor="Password1">Password</label>
              <div className="pass">
                <input
                  ref={passref}
                  type="password"
                  name="password"
                  className="form-control my-2"
                  placeholder="Password"
                  value={logobj.password}
                  onChange={(e) => {
                    setlogobj({ ...logobj, password: e.target.value });
                  }}
                />
                <div className="errpass d-none" ref={errpassref}>
                  Password dosenot match!!!
                </div>
                <i
                  className="bi bi-eye-slash eye"
                  ref={eyeref}
                  onClick={togglepass}></i>
              </div>
            </div>
            <div className="mt-5 mb-2 text-center">
              <button className="btn btn-primary my-2 w-50 ">
                {loading ? (
                  <div className="d-flex alighn-items-center justify-content-center">
                    <Oval color="white" height="25" width="25" />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>
              <i>Forget Password?</i>{" "}
              <button className="forgetpassbtn">Reset Password</button>
            </p>
          </div>
          <div className="text-center">
            <p>
              <i>Didn't have Account?</i>{" "}
              <button className="registerbtn" onClick={handleregister}>
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
