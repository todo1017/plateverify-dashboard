import React from "react";
import TextField from "@material-ui/core/TextField";

const FormikInput = ({ formik, name, ...props }) => {

  const handleChange = event => {
    formik.handleChange(event);
    if (!formik.touched[name]) {
      formik.touched[name] = true;
    }
  };

  return (
    <TextField
      size="small"
      name={name}
      error={formik.touched[name] && formik.errors[name] !== undefined}
      helperText={formik.touched[name] && formik.errors[name]}
      value={formik.values[name]}
      onChange={handleChange}
      {...props}
    />
  );
}

export default FormikInput;