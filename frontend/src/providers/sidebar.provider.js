import useProvideSidebar from "../hooks/provide.sidebar";
import sidebarContext from "./sidebar.context";

export default function ProvideSidebar({ children }) {
  const sidebar = useProvideSidebar();
  return (
    <sidebarContext.Provider value={sidebar}>
      {children}
    </sidebarContext.Provider>
  );
}
