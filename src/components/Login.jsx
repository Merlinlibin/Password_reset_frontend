import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../styles/Login.css";

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
    console.log("Logging in user...");

    try {
      const response = await axios.post(loginUrl, logobj);

      const data = await response.data;

      if (response.status === 200) {
        console.log("User logged in successfully");
        console.log(data);
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
      console.log("Error logging in...", e);
    }
  };
  const handleregister = () => {
    event.preventDefault();
    setregistered(false)
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
                <i
                  className="bi bi-eye-slash eye"
                  ref={eyeref}
                  onClick={togglepass}></i>
              </div>
            </div>
            <div className="mt-5 mb-2 text-center">
              <button className="btn btn-primary my-2 ">Login</button>
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
