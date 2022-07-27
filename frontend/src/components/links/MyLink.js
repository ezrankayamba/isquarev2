import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { InboxIcon } from "../icons/mu.icons";

export default function MyLink({ children, icon, ...rest }) {
  return (
    <NavLink
      className={(link) => "my-link ripple" + (link.isActive ? " active" : "")}
      {...rest}
    >
      <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItem>
    </NavLink>
  );
}
