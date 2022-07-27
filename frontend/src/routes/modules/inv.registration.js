import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import FileField from "../../components/inputs/FileField";
import InputField from "../../components/inputs/InputField";
import MultiSelectTagged from "../../components/inputs/MultiSelectTagged";
import SelectField from "../../components/inputs/SelectField";
import backend from "../../config/backend";
import useAuth from "../../hooks/auth";
import Api from "../../services/api";

export default function InvestorRegistration() {
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
  const developmentStage = useQuery(
    "DevelopmentStage",
    async () => await Api.get(`${backend.baseUrl}/setups/DevelopmentStage`)
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
      role: "Investor",
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
          <Typography>Register as Investor</Typography>
        </Box>
        <form onSubmit={formSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                name="name"
                label="Investment Name"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="description"
                label="Description"
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
            <Grid item xs={12}>
              <InputField
                name="web_profile_url"
                label="Web Profile"
                placeholder="Enter URL"
                handleChange={handleChange}
                type="url"
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectTagged
                name="target_industry"
                label="Target Industry"
                options={
                  businessAreas.isLoading ? [] : businessAreas.data.data.setups
                }
                handleChange={handleChange}
                selectedOptions={data["target_industry"]}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectTagged
                name="invest_on"
                label="Invest On"
                options={
                  developmentStage.isLoading
                    ? []
                    : developmentStage.data.data.setups
                }
                handleChange={handleChange}
                selectedOptions={data["invest_on"]}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="affiliation_association"
                label="Affiliation to Investment Association e.g. TZ Angel Ivestors Network"
                handleChange={handleChange}
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <FileField
                name="business_licence"
                label="Business Licence"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <Typography
                  sx={{ typography: "subtitle2" }}
                  style={{ fontWeight: "bold" }}
                >
                  Non Disclosure Agreement (NDA)
                </Typography>
                <FormControlLabel
                  style={{ alignItems: "start" }}
                  control={
                    <Checkbox
                      defaultChecked
                      style={{ paddingTop: "0.1em" }}
                      required
                    />
                  }
                  label="That by submitting this information (and registering into the
                    system), the Investor is agreeing to an NDA that they are
                    legally bound not to use any ideas they are exposed to in this
                    platform unless they follow the proper channels."
                  name="accept_nda"
                />
              </FormGroup>
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
