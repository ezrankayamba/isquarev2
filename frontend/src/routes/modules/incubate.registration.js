import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import EntitySelectField from "../../components/inputs/EntitySelectField";
import InputField from "../../components/inputs/InputField";
import MultiSelectTagged from "../../components/inputs/MultiSelectTagged";
import SelectField from "../../components/inputs/SelectField";
import backend from "../../config/backend";
import useAuth from "../../hooks/auth";
import Api from "../../services/api";

export default function IncubateRegistration() {
  const [data, setData] = useState({});
  // const [hubs, setHubs] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();
  const locations = useQuery(
    "Location",
    async () => await Api.get(`${backend.baseUrl}/setups/Location`)
  );
  const businessModels = useQuery(
    "BusinessModel",
    async () => await Api.get(`${backend.baseUrl}/setups/BusinessModel`)
  );
  const businessAreas = useQuery(
    "BusinessArea",
    async () => await Api.get(`${backend.baseUrl}/setups/BusinessArea`)
  );
  const educationLevels = useQuery(
    "EducationLevel",
    async () => await Api.get(`${backend.baseUrl}/setups/EducationLevel`)
  );
  const operationModels = useQuery(
    "OperationModel",
    async () => await Api.get(`${backend.baseUrl}/setups/OperationModel`)
  );
  const hubs = useQuery(
    "Hubs",
    async () => await Api.get(`${backend.baseUrl}/profile/hubs`)
  );
  const formSubmit = async (ev) => {
    ev.preventDefault();
    // let url = `${backend.baseUrl}/profile/register`;
    // let req = {
    //   fields: [data].map(({ hubId, ...rest }) => rest)[0],
    //   role: "Incubatee",
    //   hubId: data.hubId,
    // };

    // let res = await Api.post(url, req);
    // if (res.status === 200) {
    //   await auth.isAuthenticated(true);
    //   navigate("/myprofile");
    // }
    let valid = ev.target.reportValidity();
    if (!valid) return false;

    let url = `${backend.baseUrl}/profile/register`;
    let fields = {};
    let { hubId, ...dataCopy } = { ...data };
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
      role: "Incubatee",
      hubId: data.hubId,
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
  // const businessModels = [
  //   { label: "B2B", value: "B2B" },
  //   { label: "B2C", value: "B2C" },
  // ];
  // const businessAreas = [
  //   { label: "Agriculture", value: "Agriculture" },
  //   { label: "Mining", value: "Mining" },
  //   { label: "Education", value: "Education" },
  //   { label: "Health", value: "Health" },
  //   { label: "Other", value: "Other" },
  // ];
  // const educationLevels = [
  //   { label: "PhD", value: "PhD" },
  //   { label: "Masters", value: "Masters" },
  //   { label: "Bachelor", value: "Bachelor" },
  //   { label: "Diploma", value: "Diploma" },
  //   { label: "Other", value: "Other" },
  // ];
  // const operationModels = [
  //   { label: "Team", value: "Team" },
  //   { label: "Individual", value: "Individual" },
  // ];

  return (
    <Paper elevation={1}>
      <Box paddingX={2} paddingY={2}>
        <Box paddingY={2} paddingTop={0}>
          <Typography>Register as Incubatee</Typography>
        </Box>
        <form onSubmit={formSubmit} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <InputField
                name="name"
                label="Business Name (Optional)"
                handleChange={handleChange}
                required={false}
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name="phone_number"
                label="Phone Number e.g. +255712444999"
                handleChange={handleChange}
                type="tel"
                pattern="(0|\+[\d]{1,3})[0-9]{9}"
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="description"
                label="Description"
                handleChange={handleChange}
                multiline
                minRows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectTagged
                name="business_model"
                label="Business Development Model"
                options={
                  businessModels.isLoading
                    ? []
                    : businessModels.data.data.setups
                }
                handleChange={handleChange}
                selectedOptions={data["business_model"]}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectTagged
                name="business_field"
                label="Business Field"
                options={
                  businessAreas.isLoading ? [] : businessAreas.data.data.setups
                }
                handleChange={handleChange}
                selectedOptions={data["business_field"]}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectTagged
                name="operation_model"
                label="Operation Model"
                options={
                  operationModels.isLoading
                    ? []
                    : operationModels.data.data.setups
                }
                handleChange={handleChange}
                selectedOptions={data["operation_model"]}
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
            <Grid item xs={12}>
              <EntitySelectField
                name="hubId"
                label="Enroll into hub"
                options={hubs.isLoading ? [] : hubs.data.data.hubs}
                handleChange={handleChange}
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
