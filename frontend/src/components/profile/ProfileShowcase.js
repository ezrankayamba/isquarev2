import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const iconStyle = {
  alignSelf: "flex-start",
  color: "#CCC",
};
const snakeToPascal = (string) => {
  return string
    .split("/")
    .map((snake) =>
      snake
        .split("_")
        .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join(" ")
    )
    .join("/");
};

export default function ProfileShowcase({ profile }) {
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
        <CardContent style={{ width: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ color: "#AAA", fontSize: "0.8em" }}
          >
            <Typography gutterBottom variant="body2" component="div">
              {profile.name}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              {profile.entity.name}
            </Typography>
          </Box>

          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography style={{ color: "#AAA" }}>Description:</Typography>
            <Typography variant="body2">
              {profile.entity ? profile.entity.description : "Error?"}
            </Typography>
          </Box>
          <Box>
            <Typography>Fields:</Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Captured Value(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profile.fields.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {snakeToPascal(row.name)}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {row.values.map((v) => (
                            <Chip
                              key={v.value}
                              label={`${v.extra || v.value}`}
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
