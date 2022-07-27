import { useEffect } from "react";
import useAuth from "../../hooks/auth";

const Logout = () => {
  let auth = useAuth();
  useEffect(() => auth.signout(() => console.log("Logged out")));
  return <h1>Logged out!</h1>;
};

export default Logout;
