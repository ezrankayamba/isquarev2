import { useContext } from "react";
import authContext from "../providers/auth.context";

export default function useAuth() {
  return useContext(authContext);
}
