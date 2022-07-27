import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputField from "./InputField";
import { Box } from "@material-ui/core";

export default function MultiSelectTagged({
  options,
  name,
  label,
  handleChange,
  selectedOptions,
  required = true,
}) {
  const defaultOptions = selectedOptions || [];
  console.log("Selected? ", defaultOptions);

  const onChange = (ev, values) => {
    let target = { name: name, value: values };
    handleChange({ target: target });
  };

  let other = defaultOptions.find((o) => o.other);

  return (
    <>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(o) => o.name}
        onChange={onChange}
        value={defaultOptions}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.name}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => {
          return (
            <InputField
              {...params}
              label={label}
              placeholder={`Choose ${label} `}
              required={required && defaultOptions.length === 0}
            />
          );
        }}
      />
      {other && (
        <Box paddingTop={1}>
          <InputField
            name={`${name}__other`}
            label={`Specify other ${label}`}
            handleChange={handleChange}
          />
        </Box>
      )}
    </>
  );
}
