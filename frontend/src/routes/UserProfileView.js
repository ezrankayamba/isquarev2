import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router";
import backend from "../config/backend";
import useAuth from "../hooks/auth";
import Api from "../services/api";
import Auth from "../services/auth";
import ProfileCard from "./auth/ProfileCard";

export default function UserProfileView() {
  const user = useAuth().user;
  const navigate = useNavigate();

  console.log(user);
  const profiles = Auth.profileRoles.map((r) => {
    return {
      ...r,
      registered: user.profiles.find((value) => value.role.name === r.name),
    };
  });
  const handleUnRegister = async (profileId) => {
    let res = await Api.delete(`${backend.baseUrl}/profile/${profileId}`);
    if (res.status === 200) {
      window.location.reload();
    }
  };
  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        {profiles.map((p) => (
          <Grid key={p.name} item xs={12} md={4} style={{ display: "flex" }}>
            <ProfileCard profile={p} handleUnRegister={handleUnRegister} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
