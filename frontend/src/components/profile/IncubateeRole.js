import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
const axios = require("axios").default;
const URL = "http://localhost:5000/api/profile";

const styles = {
  inputs: { maxWidth: "100%", width: "20rem" },
};

export default function IncubateeRole({ stepId, onDataReady }) {
  const [data, setData] = useState({});
  const [hubs, setHubs] = useState([]);

  useEffect(() => {
    let valid = true;
    [("name", "description", "hub_id")].forEach((i) => {
      console.log(valid, data[i]);
      valid = valid && !!data[i];
    });
    console.log("Valid?", valid);
    if (valid) {
      onDataReady(stepId, { ...data, valid: true });
    }

    axios.get(URL + "/hubs").then((res) => {
      console.log("Response: ", res);
      setHubs(res.data.hubs);
    });
  }, [data]);

  const handleChange = (ev) => {
    let { name, value } = ev.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div className="step-content">
      <h2>Incubatee Role</h2>
      <TextField
        name="name"
        label="Incubation name"
        placeholder="Enter incubation name"
        variant="outlined"
        size="small"
        margin="normal"
        onChange={handleChange}
        style={styles.inputs}
      />
      <br />
      <TextField
        name="description"
        label="Description"
        placeholder="Enter description"
        variant="outlined"
        size="small"
        margin="normal"
        onChange={handleChange}
        multiline
        minRows={4}
        style={styles.inputs}
      />
      <br />
      <TextField
        name="hub_id"
        label="Enroll to hub"
        placeholder="Select hub to enroll"
        variant="outlined"
        size="small"
        margin="normal"
        onChange={handleChange}
        style={styles.inputs}
        select
      >
        {hubs.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </TextField>
    </div>
  );
}
