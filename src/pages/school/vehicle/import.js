import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import ListIcon from '@material-ui/icons/List';
import { useFormik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import PrivateLink from "components/link/private";
import FormikSelect from "components/formik/formikSelect";
import Dropzone from "components/dropzone/dropzone";
import vehicleActions from "store/school/vehicle/actions";

const validationSchema = Yup.object().shape({
  plate : Yup.string().required('Required'),
  make  : Yup.string().required('Required'),
  model : Yup.string().required('Required'),
  body  : Yup.string().required('Required'),
  color : Yup.string().required('Required'),
});

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
  box: {
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
  const dispatch = useDispatch();
  const vehicleState = useSelector(state => state.School.Vehicle);
  const options = vehicleState.parsed? vehicleState.parsed.meta.fields : [];
  const [file, setFile] = useState(null);

  console.log(vehicleState);

  useEffectOnce(() => {
    dispatch({ type: vehicleActions.PARSE_CLEAR });
  });

  const formik = useFormik({
    initialValues: {
      plate: '',
      make: '',
      model: '',
      body: '',
      color: '',
    },
    validationSchema,
    onSubmit: values => {
      let data = new FormData();
      data.append('file', file);
      data.append('plate', values.plate);
      data.append('make', values.make);
      data.append('model', values.model);
      data.append('body', values.body);
      data.append('color', values.color);
      dispatch(vehicleActions.upload(data));
    }
  });

  const clearForm = () => {
    formik.values.plate = '';
    formik.values.make = '';
    formik.values.model = '';
    formik.values.body = '';
    formik.values.color = '';
  }

  const autoMap = () => {
    const last = options[options.length-1];
    const fields = [
      'plate',
      'make',
      'model',
      'body',
      'color',
    ];
    
    for (let i = 0; i < fields.length; i++) {
      formik.setFieldValue(fields[i], options[i] || last);
    }
  }

  const handleParse = files => {
    setFile(files[0]);
    clearForm();
    let data = new FormData();
    data.append('type', 'parse');
    data.append('file', files[0]);
    dispatch(vehicleActions.parse(data));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink roles={[]} to="/vehicle">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}>
              List
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.root}>
          <div className={classnames(classes.box, classes.space)}>
            <Dropzone onDrop={handleParse}>
              {file
                ?<>
                  <div>Drag 'n' drop some files here, or click to select files</div>
                  <div className={classes.textCenter}>{file.name}</div>
                </>
                :<div>Drag 'n' drop some files here, or click to select files</div>
              }
            </Dropzone>

            {vehicleState.parsed &&
              <form className={classes.space}>
                <Button
                  onClick={autoMap}
                  variant="outlined"
                  color="primary">
                  Auto Map
                </Button>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className={classes.space}>
                      <FormikSelect formik={formik} options={options} name="plate" label="Plate" />
                      <FormikSelect formik={formik} options={options} name="make" label="Vehicle Make" />
                      <FormikSelect formik={formik} options={options} name="model" label="Vehicle Model" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className={classes.space}>
                      <FormikSelect formik={formik} options={options} name="body" label="Vehicle Body Type" />
                      <FormikSelect formik={formik} options={options} name="color" label="Vehicle Color" />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={formik.submitForm}
                  variant="contained"
                  color="primary"
                  fullWidth>
                  Start Import
                </Button>
              </form>
            }
            
            {vehicleState.action === vehicleActions.UPLOAD_FAILURE &&
              <Alert severity="error">Incomplete</Alert>
            }

            {vehicleState.action === vehicleActions.UPLOAD_SUCCESS &&
              <div className={classes.space}>
                <Alert severity="success">
                  Total Rows: {vehicleState.parsed.data.length}
                </Alert>
                {vehicleState.failed.length > 0 &&
                  <Alert severity="error">
                    Failed Rows: {vehicleState.failed.length}
                  </Alert>
                }
              </div>
            }
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default VehicleImport;