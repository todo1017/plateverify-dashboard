import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "api";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PageBackLink from "components/PageBackLink";
import DataBox from "components/DataBox";
import FileOpen from "components/FileOpen";
import FormSelect from "components/FormSelect";

const useStyles = makeStyles({
  padding: {
    padding: 16
  },
  space: {
    '& > *+*' : {
      marginTop: 16
    }
  },
  fileSelect: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderBottom: '1px solid #eee',
    '& > *+*' : {
      marginLeft: 16
    }
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    '& > *+*' : {
      marginLeft: 16
    }
  },
  failed: {
    color: '#e91e63'
  }
});

const CustomSelect = ({errors, name, ...props}) => (
  <FormSelect
    defaultValue=""
    name={name}
    error={!!errors[name]}
    helperText={errors[name] && <span>This field is required</span>}
    rules={{ required: true }}
    {...props}
  />
);

const OffenderImport = () => {

  const classes = useStyles();
  const { control, handleSubmit, errors, setValue } = useForm();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(0);

  const handleParse = async f => {
    setFile(f);
    setFields([]);
    setTotal(0);
    setFailed(0);

    if (f) {
      setIsLoading(true);
      let data = new FormData();
      data.append('type', 'parse');
      data.append('file', f);
      const response = await api.post('/offender/parse', data);
      if (response) {
        setFields(response.data.meta.fields);
        setTotal(response.data.data.length);
      }
      setIsLoading(false);
    }
  };
  
  const onSubmit = async values => {
    let data = new FormData();
    data.append('file', file);
    data.append('name', values.name);
    data.append('address', values.address);
    data.append('risk_level', values.risk_level);
    data.append('plate', values.plate);
    data.append('vehicle_make', values.vehicle_make);
    data.append('vehicle_model', values.vehicle_model);
    data.append('vehicle_color', values.vehicle_color);
    data.append('vehicle_year', values.vehicle_year);
    data.append('vehicle_state', values.vehicle_state);
    
    setIsLoading(true);
    const response = await api.post('/offender/import', data);
    if (response) {
      setFailed(response.data.failedRows.length);
    }
    setIsLoading(false);
  };

  const autoFill = () => {
    const last = fields[fields.length-1];
    const options = ['name', 'address', 'risk_level', 'plate', 'vehicle_make', 'vehicle_model', 'vehicle_color', 'vehicle_year', 'vehicle_state'];
    for (let i = 0; i < options.length; i++) {
      setValue(options[i], fields[i] || last);
    }
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/admin/offender">
        Offenders
      </PageBackLink>
      <DataBox
        height={100}
        loading={isLoading}
      >
        <div className={classes.fileSelect}>
          <FileOpen onSelect={handleParse} />
          {file && <span>Total Rows: {total}</span>}
          {failed > 0 &&
            <span className={classes.failed}>
              Failed Rows: {failed}
            </span>
          }
        </div>
        {total > 0 &&
          <form className={classes.padding} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.space}>
              <Button disabled={isLoading} onClick={autoFill}>
                auto fill
              </Button>
              <CustomSelect errors={errors} control={control} options={fields} label="Name" name="name"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Address" name="address"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Risk Level" name="risk_level"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Plate" name="plate"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Vehicle Make" name="vehicle_make"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Vehicle Model" name="vehicle_model"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Vehicle Color" name="vehicle_color"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Vehicle Year" name="vehicle_year"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Vehicle State" name="vehicle_state"/>
              <Button disabled={isLoading} type="submit" color="primary">
                run
              </Button>
            </div>
          </form>
        }
      </DataBox>
    </div>
  );
};

OffenderImport.title = "Offender Import";

export default OffenderImport;