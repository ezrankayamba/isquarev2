import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MyLink from "./links/MyLink";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

export default function NavSidebar() {
  return (
    <div className="sidebar sidebar-left" role="presentation">
      {/* <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li>
            <MyLink to="/">Home</MyLink>
          </li>
          <li>
            <MyLink to="/myprofile">My Profile</MyLink>
          </li>
          <li>
            <MyLink to="/about">About</MyLink>
          </li>
          <li>
            <MyLink to="/auth/logout">Logout</MyLink>
          </li>
        </ul>
      </div> */}
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
