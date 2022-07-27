import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useContext, useState } from "react";
import ProfileContext from "../../contexts/profile.context";

export default function RegisterProfile() {
  const [role, setRole] = useState(null);
  const { data, updateData } = useContext(ProfileContext);
  console.log("Ctx", data, updateData);
  const handleRoleChange = (ev) => {
    setRole(ev.target.value);
    // onDataReady(stepId, { valid: true, role: ev.target.value });
    updateData({
      "data-1": { valid: true, role: ev.target.value },
    });
  };

  return (
    <div className="step-content">
      <FormControl component="fieldset">
        <FormLabel component="legend">Register As: </FormLabel>
        <RadioGroup
          aria-label="role"
          name="role"
          value={role}
          onChange={handleRoleChange}
        >
          <FormControlLabel
            value="Incubatee"
            control={<Radio />}
            label="Incubatee"
          />
          <FormControlLabel
            value="Hub manager"
            control={<Radio />}
            label="Hub manager"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
