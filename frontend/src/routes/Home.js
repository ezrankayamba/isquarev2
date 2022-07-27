import useAuth from "../hooks/auth";
import React from "react";
import { useQuery } from "react-query";
import backend from "../config/backend";
import Api from "../services/api";
import { Box, Grid, Typography } from "@material-ui/core";
import ProfileShowcase from "../components/profile/ProfileShowcase";

const Home = () => {
  const auth = useAuth();
  const { isLoading, error, data } = useQuery(
    "myProfiles",
    async () => await Api.get(`${backend.baseUrl}/profile/myprofiles`)
  );
  if (isLoading) {
    return (
      <Box>
        <Typography>Loading ...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography>Error loading profiles ...</Typography>
      </Box>
    );
  }
  let profiles = data.data.profiles;
  console.log(profiles);
  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        {profiles.map((p) => (
          <Grid item xs={12}>
            <ProfileShowcase profile={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
