import { TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ProfileContext from "./ProfileContext";

const styles = {
  inputs: { maxWidth: "100%", width: "20rem" },
};

export default function HubManagerRole({ stepId }) {
  const [data, setData] = useState({});
  const profileCtx = useContext(ProfileContext);
  const onDataReady = profileCtx.update;

  useEffect(() => {
    let valid = true;
    [("name", "description")].forEach((i) => {
      console.log(valid, data[i]);
      valid = valid && !!data[i];
    });
    console.log("Valid?", valid);
    if (valid) {
      onDataReady(stepId, { ...data, valid: true });
    }
  }, [data]);

  const handleChange = (ev) => {
    let { name, value } = ev.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div className="step-content">
      <h2>Hub Manager Role</h2>
      <TextField
        name="name"
        label="Hub name"
        placeholder="Enter hub name"
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
    </div>
  );
}
