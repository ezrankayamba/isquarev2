import { Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import useAuth from "../hooks/auth";
import UserAvatar from "./images/UserAvatar";
import SearchBox from "./search/SearchBox";

export default function Header({ sidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let auth = useAuth();
  // let auth = useProvideAuth();
  const handleClick = (ev) => {
    ev.stopPropagation();
    sidebar.menuToggle();
  };
  return (
    <div className="header-info">
      <h4 className="logo-text">
        <button onClick={handleClick} className="humberger-menu">
          &#x2630;
        </button>
        iSQUARE
      </h4>
      <SearchBox />
      {auth.user && !sidebar.isMobile() && (
        <aside>
          {auth.user.first_name}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleAvatarClick}
          >
            <UserAvatar />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            // onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </aside>
      )}
    </div>
  );
}
