import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import ListIcon from '@material-ui/icons/List';
import Dropzone from "components/dropzone/dropzone";
import PageHead from "components/_custom/pageHead";
import StatusBox from "components/_custom/statusBox";
import FormSelect from "components/_custom/formSelect";
import api from "containers/api";

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
  }
});

const VehicleImport = () => {

  const classes = useStyles();
  const { control, handleSubmit, errors, reset, setValue } = useForm();
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [parsed, setParsed] = useState(null);
  const [failed, setFailed] = useState(null);
  const options = parsed? parsed.meta.fields : [];
  const formStatus = (isParsing || isUploading) ? 'wait' : !parsed ? 'empty' : '';
  const onSubmit = async values => {
    let data = new FormData();
    data.append('file', file);
    data.append('plate', values.plate);
    data.append('make', values.make);
    data.append('model', values.model);
    data.append('body', values.body);
    data.append('color', values.color);
    
    setIsUploading(true);
    const response = await api.post('/vehicle/import', data);
    if (response) {
      setFailed(response.data.failed);
    }
    setIsUploading(false);
  };

  const autoMap = () => {
    const last = options[options.length-1];
    const fields = [
      'plate',
      'make',
      'model',
      'body',
      'color'
    ];
    for (let i = 0; i < fields.length; i++) {
      setValue(fields[i], options[i] || last);
    }
  };

  const handleParse = async files => {
    setFile(files[0]);
    let data = new FormData();
    data.append('type', 'parse');
    data.append('file', files[0]);
    
    reset();
    setIsParsing(true);
    setParsed(null);
    setFailed(null);
    const response = await api.post('/vehicle/parse', data);
    if (response) {
      setParsed(response.data);
    }
    setIsParsing(false);
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/vehicle">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}
            >
              List
            </Button>
          </Link>
        </PageHead>
        <Paper>
          <div className={classes.padding}>
            <Dropzone onDrop={handleParse}>
              {file
                ?<>
                  <div>Drag 'n' drop some files here, or click to select files</div>
                  <div className={classes.textCenter}>{file.name}</div>
                </>
                :<div>Drag 'n' drop some files here, or click to select files</div>
              }
            </Dropzone>
          </div>
          <StatusBox height={100} type="line" status={formStatus}>
            <div className={classes.space}>
              {parsed &&
                <Alert variant="outlined" severity="info">
                  Total Rows: {parsed.data.length}
                </Alert>
              }
              {failed && failed.length > 0 &&
                <Alert severity="error">
                  Count of Failed Rows: {failed.length}
                </Alert>
              }
              {failed && failed.length === 0 &&
                <Alert severity="success">Success</Alert>
              }
              <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
                <FormSelect
                  label="Select Plate"
                  name="plate"
                  defaultValue=""
                  error={!!errors.plate}
                  helperText={errors.plate && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Make"
                  name="make"
                  defaultValue=""
                  error={!!errors.make}
                  helperText={errors.make && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Model"
                  name="model"
                  defaultValue=""
                  error={!!errors.model}
                  helperText={errors.model && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Body"
                  name="body"
                  defaultValue=""
                  error={!!errors.body}
                  helperText={errors.body && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Color"
                  name="color"
                  defaultValue=""
                  error={!!errors.color}
                  helperText={errors.color && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <Button
                  disabled={isUploading}
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={autoMap}
                >
                  auto map
                </Button>
                <Button
                  disabled={isUploading}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  upload
                </Button>
              </form>
            </div>
          </StatusBox>
        </Paper>
      </div>
    </div>
  );
};

export default VehicleImport;