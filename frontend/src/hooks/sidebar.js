import { useContext } from "react";
import sidebarContext from "../providers/sidebar.context";

export default function useSidebar() {
  return useContext(sidebarContext);
}
