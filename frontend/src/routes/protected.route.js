import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/auth";

export default function ProtectedRoute({ children, ...rest }) {
  let auth = useAuth();
  let [ready, setReady] = useState(false);
  let [authenticated, setAuthenticated] = useState(false);
  let location = useLocation();
  useEffect(() => {
    async function check(cb) {
      let res = await auth.isAuthenticated();
      cb(res);
    }
    check((res) => {
      setAuthenticated(res);
      setReady(true);
    });
    return () => {};
  }, [auth]);

  if (!ready) return null;

  if (!authenticated || !auth.user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }
  return <Outlet />;
}
