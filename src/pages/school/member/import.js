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

const MemberImport = () => {

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
    data.append('group', values.group);
    data.append('first_name', values.first_name);
    data.append('last_name', values.last_name);
    data.append('address', values.address);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('grade', values.grade);
    data.append('graduation', values.graduation);
    
    setIsUploading(true);
    const response = await api.post('/member/import', data);
    if (response) {
      setFailed(response.data.failed);
    }
    setIsUploading(false);
  };

  const autoMap = () => {
    const last = options[options.length-1];
    const fields = [
      'group',
      'first_name',
      'last_name',
      'address',
      'email',
      'phone',
      'grade',
      'graduation',
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
    const response = await api.post('/member/parse', data);
    if (response) {
      setParsed(response.data);
    }
    setIsParsing(false);
  };

  console.log(parsed);

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/member">
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
                  label="Select Group"
                  name="group"
                  defaultValue=""
                  error={!!errors.group}
                  helperText={errors.group && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select First Name"
                  name="first_name"
                  defaultValue=""
                  error={!!errors.first_name}
                  helperText={errors.first_name && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Last Name"
                  name="last_name"
                  defaultValue=""
                  error={!!errors.last_name}
                  helperText={errors.last_name && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Address"
                  name="address"
                  defaultValue=""
                  error={!!errors.address}
                  helperText={errors.address && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Email"
                  name="email"
                  defaultValue=""
                  error={!!errors.email}
                  helperText={errors.email && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Phone"
                  name="phone"
                  defaultValue=""
                  error={!!errors.phone}
                  helperText={errors.phone && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Grade"
                  name="grade"
                  defaultValue=""
                  error={!!errors.grade}
                  helperText={errors.grade && <span>This field is required</span>}
                  control={control}
                  rules={{ required: true }}
                  options={options}
                />
                <FormSelect
                  label="Select Graduation"
                  name="graduation"
                  defaultValue=""
                  error={!!errors.graduation}
                  helperText={errors.graduation && <span>This field is required</span>}
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

export default MemberImport;