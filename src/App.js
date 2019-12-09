/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Navbar from "./components/Navbar";
import ReactNotifications from "react-notifications-component";
import notify from "./utils/Notification";

import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        notify("Success", `Welcome ${data.user.email}!`, "success");
      } else {
        setUser(null);
        localStorage.removeItem("token");
        notify("Error", `Fail to login!`, "error");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <ReactNotifications />
      {loading
        ? <CircularProgress />
        : <div>
            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/login">
                <Login setUser={setUser} />
              </Route>
              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route path="/new-password/:token">
                <NewPassword />
              </Route>
              <ProtectedRoute path="/home">
                <Home user={user} />
              </ProtectedRoute>
              <ProtectedRoute path="/">
                <Home user={user} />
              </ProtectedRoute>
            </Switch>
          </div>}
    </div>
  );
}

export default App;
