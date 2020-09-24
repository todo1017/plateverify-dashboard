import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles({
  label: {
    background: 'white',
    padding: '0 8px',
    transition: 'none',
    borderRadius: 2
  },
});

const FormikSelect = ({ formik, name, label, options, ...props }) => {

  const classes = useStyles();

  const handleChange = event => {
    formik.handleChange(event);
    if (!formik.touched[name]) {
      formik.touched[name] = true;
    }
  };

  const isError = formik.touched[name] && formik.errors[name] !== undefined;
  const helperText = formik.touched[name] && formik.errors[name];

  return (
    <FormControl variant="outlined" size="small" fullWidth error={isError} {...props}>
      <InputLabel classes={{ root: classes.label, focused: classes.focus }}>{label}</InputLabel>
      <Select
        name={name}
        value={formik.values[name]}
        onChange={handleChange}>
        {options.map(option =>
          <MenuItem value={option} key={option}>{option}</MenuItem>
        )}
      </Select>
      {isError &&
        <FormHelperText>{helperText}</FormHelperText>
      }
    </FormControl>
  );
}

export default FormikSelect;