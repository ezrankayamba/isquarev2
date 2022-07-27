import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Icon,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function ProfileCard({ profile, handleUnRegister }) {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      elevation={0}
    >
      <CardActionArea
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h6" component="div">
              {profile.name}
            </Typography>
            {profile.registered ? (
              <Icon style={{ color: "#3F3" }}>task_alt</Icon>
            ) : null}
          </Box>
          <Typography variant="body2">{profile.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          display: "flex",
        }}
      >
        {profile.registered ? (
          <Button
            size="small"
            color="secondary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5rem",
            }}
            onClick={() => handleUnRegister(profile.registered.id)}
          >
            <Typography>Unregister</Typography>
            <Icon>chevron_right</Icon>
          </Button>
        ) : (
          <Link to="register" state={{ role: profile.name }}>
            <Button size="small">
              <Typography>Register Now</Typography>
              <Icon>chevron_right</Icon>
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}
