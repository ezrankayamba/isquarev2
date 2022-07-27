import { Box, Button, Icon, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserAvatar from "../components/images/UserAvatar";
import useAuth from "../hooks/auth";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const auth = useAuth();
  const { pathname } = useLocation();

  return (
    <Box padding={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          pb: "1rem",
        }}
      >
        <Box width="4rem">
          <UserAvatar />
        </Box>
        <Box>
          <Typography variant="h6">
            {auth.user.first_name} {auth.user.last_name}
          </Typography>
          <Typography>{auth.user.email}</Typography>
          {auth.role && (
            <Typography color="primary">Role: {auth.role.name}</Typography>
          )}
        </Box>
      </Box>
      {pathname === "/myprofile" ? null : (
        <Box
          sx={{
            pb: ".4rem",
            width: 1,
          }}
        >
          <Link to={""}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Icon>arrow_back</Icon>}
              color="secondary"
            >
              Back
            </Button>
          </Link>
        </Box>
      )}
      <Outlet />
    </Box>
  );
}
