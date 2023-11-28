import axios from "axios";
import React, { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [loading, setloading] = useState(false);
  const resetUrl = "http://localhost:3000/api/passwordReset/";
  const passref = useRef("");
  const eyeref = useRef("");
  const [resetobj, setresetobj] = useState({ email: "", newPassword: "" });
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

  const handleresetpass = async () => {
    event.preventDefault();
    console.log(resetobj);

    setloading(true);
    
    console.log("Resetting the user password...");

    try {
      const response = await axios.patch(resetUrl, resetobj);
      const data = await response.data;
      console.log(data);
      if (response.status === 200) {
        console.log("password changed successfully");
        console.log(response.status);
        setresetobj({
          email: "",
          newPassword: "",
        });
        setloading(false);
        navigate("/login");
      }
    } catch (e) {
      setloading(false);
      console.log("Error logging in...", e);
   }
    
  };
  return (
    <div className="main">
      <div className="container  sub">
        <h2 className="text-center my-4">Reset Password</h2>
        <div className="row container">
          <form onSubmit={handleresetpass}>
            <div className="form-group my-3">
              <label htmlFor="email">Enter your Email</label>
              <div className="email">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control my-2"
                  placeholder="enter your email... "
                  value={resetobj.email}
                  onChange={(e) =>
                    setresetobj({ ...resetobj, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group my-3">
              <label htmlFor="newPassword">Enter new Password</label>
              <div className="pass">
                <input
                  required
                  type="password"
                  name="newpassword"
                  className="form-control my-2"
                  placeholder="Password"
                  ref={passref}
                  minLength={6}
                  value={resetobj.newPassword}
                  onChange={(e) =>
                    setresetobj({ ...resetobj, newPassword: e.target.value })
                  }
                />
                <i
                  className="bi bi-eye-slash eye"
                  onClick={togglepass}
                  ref={eyeref}></i>
              </div>
            </div>
            <div className="mt-2 mb-2 text-center">
              <button className="btn btn-primary my-2 w-50 ">
                {loading ? (
                  <div className="d-flex alighn-items-center justify-content-center">
                    <Oval color="white" height="25" width="25" />
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
