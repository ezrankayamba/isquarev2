import { useState } from "react";
import Auth from "../services/auth";

export default function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const SESSION_TM_MS = 1000 * 5 * 60; //5 minutes timeout
  const timer = { now: SESSION_TM_MS };
  const SESSION_CHK_MS = 100;
  const body = document.querySelector("body");

  const isAuthenticated = async (refresh = false) => {
    if (user && !refresh) {
      if (!loggedIn) {
        setLoggedIn(true);
      }
      return true;
    }

    let res = await Auth.me();

    if (res && res.status === 200) {
      setUser(res.data);
      initTimer();
      setLoggedIn(true);
      let profiles = res.data.profiles;
      let profile = profiles && profiles.length ? profiles[0] : null;
      let role = profile ? profile.role : null;
      setRole(role);
      console.log("Role set: ", role);
      return true;
    }

    return false;
  };
  const resetTimer = (event) => {
    timer.now = SESSION_TM_MS;
  };
  const setMonitor = () => {
    body.addEventListener("keypress", resetTimer, true);
    body.addEventListener("mousemove", resetTimer, true);
  };
  const clrMonitor = () => {
    body.removeEventListener("keypress", resetTimer, true);
    body.removeEventListener("mousemove", resetTimer, true);
  };
  const initTimer = () => {
    setMonitor();
    const tmInterval = setInterval(() => {
      // console.log(timer);
      if (timer.now <= 0) {
        clrMonitor();
        clearInterval(tmInterval);
        signout(() => console.log("Logged out automatically!"));
      }
      timer.now = timer.now - SESSION_CHK_MS;
    }, SESSION_CHK_MS);
  };
  const signin = async (params, cb) => {
    let res = await Auth.loginUser(params);
    if (res.status === 200) {
      cb(null);
      initTimer();
      setLoggedIn(true);
    } else {
      setUser(null);
      cb(res.data.message);
    }
  };

  const signout = async (cb) => {
    if (loggedIn) {
      await Auth.logoutUser();
      setUser(null);
      setLoggedIn(false);
    }
    cb();
  };

  return {
    user,
    signin,
    signout,
    isAuthenticated,
    loggedIn,
    role,
    setRole,
  };
}
