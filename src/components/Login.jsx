import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../styles/Login.css";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Login({
  token,
  settoken,
  user,
  setuser,
  logobj,
  setlogobj,
}) {
  const loginUrl = "https://loginbackend-7ar3.onrender.com/api/login/";
  const emailresetUrl = "https://loginbackend-7ar3.onrender.com/api/mailReset";
  const passref = useRef("");
  const eyeref = useRef("");
  const errMailref = useRef("");
  const errpassref = useRef("");
  const resetmailref=useRef("")
  const [loading, setloading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [resetmail, setresetmail] = useState("");
  const navigate = useNavigate();

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

          try {
            const response = await axios.post(loginUrl, logobj);

            const data = await response.data;
            console.log(data);
            if (response.status === 200) {
              console.log("User logged in successfully");
              console.log(response.status);
              setlogobj({
                email: "",
                password: "",
              });
              settoken(data.token);
              setuser(data);
              setloading(false);
              window.localStorage.setItem("token", data.token);
              window.localStorage.setItem("user", JSON.stringify(data));
              if (window.localStorage.getItem("token")) {
                return navigate("/home");
              }
            }
          } catch (e) {
            console.log("Error logging in...", e.response.status);
            if ((e.response.status = 401)) {
              errMailref.current.className = "errMail d-block";
              errpassref.current.className = "errpass d-block";
            }
          }
          
        };


  const handleregister = () => {
          event.preventDefault();
         navigate("/register");
        };


  const handleresetpass = async () => {
        try {
          console.log(resetmail);
          const response = await axios.post(emailresetUrl, { email: resetmail });
            if (response.status === 200) {
              console.log("mail sent successfully");
              console.log(response);
              setresetmail("");
            }
        } catch (e) {
          console.log("email dosent match please register", e.response.status);
          resetmailref.current.style.visibility = "visible";
          setresetmail("");
        }
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
                required
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
              <label htmlFor="Password">Password</label>
              <div className="pass">
                <input
                  required
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
            <div>
              <p>
                <i>Forget Password?</i>{" "}
                <button
                  className="forgetpassbtn"
                  onClick={() => setpopup(true)}>
                  Reset Password
                </button>
              </p>
            </div>
            {popup ? (
              <div className="popup_back ">
                <div className="reset-popup ">
                  <h3>
                    <label htmlFor="resetpass" className="">
                      Email
                    </label>
                  </h3>
                  <div style={{ width: "80%" }}>
                    <input
                      type="email"
                      className="form-control my-2 "
                      name="resetpass"
                      placeholder="enter your email...."
                      value={resetmail}
                      onChange={(e) => setresetmail(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontSize: "20px",
                      visibility: "hidden",
                    }} ref={resetmailref}>
                    <p>! Invalid emailemail, please register</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary w-auto my-2 mx-1"
                      onClick={handleresetpass}>
                      Reset Password
                    </button>
                    <button
                      className="btn btn-primary w-auto my-2 mx-1"
                      onClick={() => setpopup(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
