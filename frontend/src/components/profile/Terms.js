import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";

export default function Terms({ stepId, onDataReady }) {
  return (
    <div className="step-content">
      <h2>Terms &amp; Conditions</h2>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(ev) => {
                let accepted = ev.target.checked;
                onDataReady(stepId, { valid: accepted, terms: accepted });
              }}
            />
          }
          label="I agree to terms and conditions"
        />
      </FormGroup>
    </div>
  );
}
