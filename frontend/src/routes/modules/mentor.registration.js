import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import InputField from "../../components/inputs/InputField";
import MultiSelectTagged from "../../components/inputs/MultiSelectTagged";
import SelectField from "../../components/inputs/SelectField";
import backend from "../../config/backend";
import useAuth from "../../hooks/auth";
import Api from "../../services/api";

export default function MentorRegistration() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const auth = useAuth();
  const businessAreas = useQuery(
    "setupsBusinessArea",
    async () => await Api.get(`${backend.baseUrl}/setups/BusinessArea`)
  );
  const locations = useQuery(
    "setupsLocation",
    async () => await Api.get(`${backend.baseUrl}/setups/Location`)
  );

  const formSubmit = async (ev) => {
    ev.preventDefault();
    let valid = ev.target.reportValidity();
    if (!valid) return false;

    let url = `${backend.baseUrl}/profile/register`;
    let fields = {};
    let dataCopy = { ...data };
    for (const key in dataCopy) {
      if (key.endsWith("__other")) {
        let name = key.split("__")[0];
        fields[name].find((o) => o.other).extra = dataCopy[key];
      } else {
        fields[key] = dataCopy[key];
      }
    }
    let req = {
      fields,
      role: "Mentor",
    };
    console.log(req);
    let res = await Api.post(url, req);
    if (res.status === 200) {
      await auth.isAuthenticated(true);
      navigate("/myprofile");
    }
  };
  const handleChange = (ev) => {
    let { name, value } = ev.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Paper elevation={1}>
      <Box paddingX={2} paddingY={2}>
        <Box paddingY={2} paddingTop={0}>
          <Typography>Register as Mentor</Typography>
        </Box>
        <form onSubmit={formSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                name="name"
                label="Name of Mentor"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="description"
                label="Business Area of Interest"
                handleChange={handleChange}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectField
                name="region"
                label="Region"
                options={locations.isLoading ? [] : locations.data.data.setups}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="physical_address"
                label="Physical Address"
                handleChange={handleChange}
                multiline
                minRows={2}
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name="contact_phone_number"
                label="Contact Phone e.g. +255712444999"
                handleChange={handleChange}
                type="tel"
                pattern="(0|\+[\d]{1,3})[0-9]{9}"
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name="contact_email"
                label="Contact Email"
                handleChange={handleChange}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="contact_hours"
                label="Contact Hours: e.g. Monday 10:00 to 16:00 HRS"
                handleChange={handleChange}
                multiline
                minRows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disableElevation
                >
                  Register Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}
