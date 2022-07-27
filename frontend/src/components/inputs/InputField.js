import { TextField } from "@material-ui/core";

const styles = {
  inputs: { margin: 0 },
};

const InputField = ({
  handleChange,
  name,
  label,
  pattern,
  required = true,
  ...rest
}) => (
  <TextField
    name={`${name}`}
    label={`${label}`}
    placeholder={rest.placeholder || `Enter ${label}`}
    variant="outlined"
    size="small"
    margin="normal"
    onChange={handleChange}
    style={styles.inputs}
    fullWidth
    required={required}
    inputProps={{ pattern: pattern }}
    InputLabelProps={{}}
    {...rest}
  />
);

export default InputField;
