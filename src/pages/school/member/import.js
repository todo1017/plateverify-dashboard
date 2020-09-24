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
import memberActions from "store/school/member/actions";

const validationSchema = Yup.object().shape({
  group: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  grade: Yup.string().required('Required'),
  graduation: Yup.string().required('Required'),
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

const MemberImport = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const memberState = useSelector(state => state.School.Member);
  const options = memberState.parsed? memberState.parsed.meta.fields : [];
  const [file, setFile] = useState(null);

  useEffectOnce(() => {
    dispatch({ type: memberActions.PARSE_CLEAR });
  });

  const formik = useFormik({
    initialValues: {
      group: '',
      first_name: '',
      last_name: '',
      address: '',
      email: '',
      phone: '',
      grade: '',
      graduation: '',
    },
    validationSchema,
    onSubmit: values => {
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
      dispatch(memberActions.upload(data));
    }
  });

  const clearForm = () => {
    formik.values.group = '';
    formik.values.first_name = '';
    formik.values.last_name = '';
    formik.values.address = '';
    formik.values.email = '';
    formik.values.phone = '';
    formik.values.grade = '';
    formik.values.graduation = '';
  }

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
      formik.setFieldValue(fields[i], options[i] || last);
    }
  }

  const handleParse = files => {
    setFile(files[0]);
    clearForm();
    let data = new FormData();
    data.append('type', 'parse');
    data.append('file', files[0]);
    dispatch(memberActions.parse(data));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink roles={[]} to="/member">
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

            {memberState.parsed &&
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
                      <FormikSelect formik={formik} options={options} name="group" label="Group" />
                      <FormikSelect formik={formik} options={options} name="first_name" label="First Name" />
                      <FormikSelect formik={formik} options={options} name="last_name" label="Last Name" />
                      <FormikSelect formik={formik} options={options} name="address" label="Address" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className={classes.space}>
                      <FormikSelect formik={formik} options={options} name="email" label="Email" />
                      <FormikSelect formik={formik} options={options} name="phone" label="Phone" />
                      <FormikSelect formik={formik} options={options} name="grade" label="Grade" />
                      <FormikSelect formik={formik} options={options} name="graduation" label="Graduation" />
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
            
            {memberState.action === memberActions.UPLOAD_FAILURE &&
              <Alert severity="error">Incomplete</Alert>
            }

            {memberState.action === memberActions.UPLOAD_SUCCESS &&
              <div className={classes.space}>
                <Alert severity="success">
                  Total Rows: {memberState.parsed.data.length}
                </Alert>
                {memberState.failed.length > 0 &&
                  <Alert severity="error">
                    Failed Rows: {memberState.failed.length}
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

export default MemberImport;