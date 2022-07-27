import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/auth";

export default function UnProtectedRoute({ children, ...rest }) {
  let auth = useAuth();
  let [ready, setReady] = useState(false);

  useEffect(() => {
    async function check(cb) {
      let res = await auth.isAuthenticated();
      cb(res);
    }
    check((res) => {
      setReady(true);
    });
    return () => {};
  }, [auth]);

  if (!ready) return null;

  return <Outlet />;
}
