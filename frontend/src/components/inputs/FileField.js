import { TextField } from "@material-ui/core";
import { fileToBase64 } from "../../services/utils";

const styles = {
  inputs: { margin: 0 },
};

const FileField = ({
  handleChange,
  name,
  label,
  pattern,
  required = true,

  ...rest
}) => {
  const handleFile = async (ev) => {
    let file = ev.target.files.length ? ev.target.files[0] : null;
    if (file) {
      console.log(file);
      let b64 = await fileToBase64(file);
      console.log(b64);
      let target = {
        name: name,
        value: {
          type: "FILE",
          value: b64,
          name: file.name,
        },
      };
      handleChange({ target: target });
    }
  };

  return (
    <TextField
      name={`${name}`}
      label={`${label}`}
      placeholder={`Enter ${label}`}
      variant="outlined"
      size="small"
      margin="normal"
      onChange={handleFile}
      style={styles.inputs}
      fullWidth
      required={required}
      inputProps={{}}
      InputLabelProps={{ shrink: true }}
      type="file"
      {...rest}
    />
  );
};

export default FileField;
