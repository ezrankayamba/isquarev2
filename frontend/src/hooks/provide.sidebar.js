import { useState } from "react";

export default function useProvideSidebar() {
  const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  let [menuOpen, setMenuOpen] = useState(!isMobile());

  const toggleSidebar = () => {
    setMenuOpen(!menuOpen);
    console.log("Changed: ", menuOpen);
  };
  const isOpen = () => menuOpen;
  return {
    toggleSidebar,
    isOpen,
    isMobile,
    menuOpen,
  };
}
