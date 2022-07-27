import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
  Badge,
  Button,
  Hidden,
  InputBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Navigate, Outlet, useNavigate } from "react-router";
import {
  MailIcon,
  MenuIcon,
  SearchIcon,
  AccountCircle,
  NotificationsIcon,
  MoreIcon,
} from "./icons/mu.icons";
import useStyles from "./styles/main.styles";
import DrawerContent from "./DrawerContent";

const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export default function MiniDrawer() {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(!isMobile());
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAvatar, setOpenAvatar] = useState(false);
  const handleAvatarClick = (event) => {
    console.log(event);
    setOpenAvatar(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (ev) => {
    ev.stopPropagation();
    setOpenAvatar(false);
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    if (isMobile()) {
      setOpen(false);
      setMobileOpen(true);
      return;
    }

    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    // setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => navigate("/auth/logout");

  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleAvatarClick}
              color="inherit"
            >
              <AccountCircle
                id="basic-button"
                aria-controls={openAvatar ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAvatar ? "true" : undefined}
              />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openAvatar}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Switch Role</MenuItem>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </Menu>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerContent handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <DrawerContent handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}
