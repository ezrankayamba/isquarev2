import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  AccountCircle,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExitToAppIcon,
  HomeIcon,
  InboxIcon,
  InfoIcon,
  MailIcon,
} from "./icons/mu.icons";
import MyLink from "./links/MyLink";
import useStyles from "./styles/main.styles";

export default function DrawerContent({ handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.toolbar}>
        <Typography variant="h6" noWrap className={classes.title}>
          iSQUARE
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <MyLink to="/" icon={<HomeIcon />}>
          My Profile
        </MyLink>
        <MyLink to="/myprofile" icon={<AccountCircle />}>
          Register
        </MyLink>
      </List>
      <Divider />
      <List>
        <MyLink to="/about" icon={<InfoIcon />}>
          About
        </MyLink>
        <MyLink to="/auth/logout" icon={<ExitToAppIcon />}>
          Logout
        </MyLink>
      </List>
    </>
  );
}
