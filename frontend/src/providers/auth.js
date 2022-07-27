import useProvideAuth from "../hooks/provide.auth";
import authContext from "./auth.context";

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
