import React, { useEffect, useState } from "react";
import Login from "./components/login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [registered, setregistered] = useState(false);
  const [token, settoken] = useState(null);
  const [user, setuser] = useState(null);
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    phone:"",
    passwordHash: "",
  });
  const [logobj, setlogobj] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");

    if (user && token) {
      setuser(JSON.parse(user));
      settoken(token);
    }
  }, []);

  return (
    <div>
      {user ? (
        <Dashboard
          token={token}
          settoken={settoken}
          user={user}
          setuser={setuser}
          registered={registered}
          setregistered={setregistered}
        />
      ) : registered ? (
        <Login
          token={token}
          settoken={settoken}
          user={user}
          setuser={setuser}
          logobj={logobj}
          setlogobj={setlogobj}
          registered={registered}
          setregistered={setregistered}
        />
      ) : (
        <Register
          registered={registered}
          setregistered={setregistered}
          registerFormData={registerFormData}
          setRegisterFormData={setRegisterFormData}
        />
      )}
    </div>
  );
}

export default App;
