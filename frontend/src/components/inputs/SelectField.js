import { MenuItem, TextField } from "@material-ui/core";
const styles = {
  inputs: { margin: 0 },
};
const SelectField = ({
  handleChange,
  name,
  label,
  options,
  defaultValue = "",
  required = true,
  ...rest
}) => (
  <TextField
    name={`${name}`}
    label={`${label}`}
    placeholder={`Enter ${label}`}
    variant="outlined"
    size="small"
    margin="normal"
    onChange={handleChange}
    style={styles.inputs}
    select
    defaultValue={defaultValue}
    required={required}
    fullWidth
    {...rest}
  >
    {options.map((option) => (
      <MenuItem key={option.name} value={option.name}>
        {option.name}
      </MenuItem>
    ))}
  </TextField>
);

export default SelectField;
