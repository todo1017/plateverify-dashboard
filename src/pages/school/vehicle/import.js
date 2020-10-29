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
  textCenter: {
    textAlign: 'center',
    color: '#3f51b5'
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

const VehicleImport = () => {

  const classes = useStyles();
  const { control, handleSubmit, errors, setValue } = useForm();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(0);

  const handleParse = async f => {
    setFile(null);
    setFields([]);
    setTotal(0);
    setFailed(0);

    if (f) {
      setIsLoading(true);
      let data = new FormData();
      data.append('type', 'parse');
      data.append('file', f);
      const response = await api.post('/vehicle/parse', data);
      if (response) {
        setFields(response.data.meta.fields);
        setTotal(response.data.data.length);
        setFile(f);
      }
      setIsLoading(false);
    }
  };

  const onSubmit = async values => {
    let data = new FormData();
    data.append('file', file);
    data.append('plate', values.plate);
    data.append('make', values.make);
    data.append('model', values.model);
    data.append('body', values.body);
    data.append('color', values.color);
    
    setIsLoading(true);
    const response = await api.post('/vehicle/import', data);
    if (response) {
      setFailed(response.data.failed.length);
    }
    setIsLoading(false);
  };

  const autoFill = () => {
    const last = fields[fields.length-1];
    const options = ['plate', 'make', 'model', 'body', 'color'];
    for (let i = 0; i < options.length; i++) {
      setValue(options[i], fields[i] || last);
    }
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/vehicle">
        Vehicles
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
              <CustomSelect errors={errors} control={control} options={fields} label="Plate" name="plate"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Make" name="make"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Model" name="model"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Body" name="body"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Color" name="color"/>
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

export default VehicleImport;