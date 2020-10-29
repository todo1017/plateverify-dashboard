import React from "react";
import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@material-ui/core";

const FormSelect = ({ options, ...props }) => {
  return (
    <Controller
      fullWidth
      select
      variant="outlined"
      size="small"
      as={TextField}
      {...props}
    >
      {options.map(option =>
        <MenuItem value={option} key={option}>{option}</MenuItem>
      )}
    </Controller>
  );
};

export default FormSelect;