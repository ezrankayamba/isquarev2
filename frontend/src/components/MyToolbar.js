import { Badge, IconButton, InputBase, Typography } from "@material-ui/core";

import {
  MailIcon,
  MoreIcon,
  NotificationsIcon,
  SearchIcon,
  AccountCircle,
} from "./icons/mu.icons";
import useStyles from "./styles/main.styles";

const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

export default function MyToolbar({
  handleMobileMenuOpen,
  handleProfileMenuOpen,
  classes,
}) {
  // const classes = useStyles();
  // console.log("Open? ", open);
  return (
    <>
      <Typography variant="h6" noWrap className={classes.title}>
        iSQUARE
      </Typography>
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
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
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
    </>
  );
}
