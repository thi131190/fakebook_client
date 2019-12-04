import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("info");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "info"
  });

  function getParam(name) {
    const url = window.location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  }

  const getUser = async () => {
    const token = localStorage.getItem("token") || getParam("api_key");
    if (token) {
      const url = "https://127.0.0.1:5000/user/get_user";
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", token);
        setUser(data.user);
      } else {
        console.log("not login, invalid key");
        setUser(null);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Navbar setUser={setUser} />
      <Toast
        open={open}
        // message={message}
        // setOpen={setOpen}
        // variant={variant}
        toast={toast}
        setToast={setToast}
      />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login
            setUser={setUser}
            // setOpen={setOpen}
            // setMessage={setMessage}
            // setVariant={setVariant}
            setToast={setToast}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
