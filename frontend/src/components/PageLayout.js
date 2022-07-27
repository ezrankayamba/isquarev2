import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import NavSidebar from "./NavSidebar";

const PageLayout = () => {
  const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  let [menuOpen, setMenuOpen] = useState(!isMobile());
  const toggleSidebar = () => setMenuOpen(!menuOpen);
  const sidebarHandler = () => {
    if (isMobile()) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="page-layout">
      <header>
        <Header sidebar={{ isMobile, menuToggle: toggleSidebar }} />
      </header>
      <main className="main-content">
        <section
          onClick={sidebarHandler}
          className={`sidebar-container${menuOpen ? " show" : ""}${
            isMobile() ? " mobile-device" : ""
          }`}
        >
          {/* <Sidebar /> */}
          <NavSidebar />
        </section>
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default PageLayout;
