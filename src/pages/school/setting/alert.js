import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Button, Modal, Backdrop, Fade, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikSelect from "components/formik/formikSelect";
import FormikInput from "components/formik/formikInput";
import settingActions from "store/school/setting/actions";

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  entity: Yup.string().required('Required'),
});

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  table: {
    '& .MuiTableCell-root': {
      whiteSpace: 'nowrap',
      textAlign: 'center'
    }
  },
  alignLeft: {
    textAlign: 'left !important'
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Alert = ({ alert }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [addForm, setAddForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: 'email',
      entity: '',
    },
    validationSchema,
    onSubmit: values => {
      let data = {
        category: 'alert',
        body: [
          ...alert.body,
          {
            type: values.type,
            entity: values.entity,
            pd: false,
            fv: false
          }
        ]
      };
      dispatch(settingActions.update(data));
    }
  });

  const toggleSwitch = (index, attr, value) => {
    let data = alert.body.map((d, i) => {
      if (i === index) {
        return {
          ...d,
          [attr]: value
        };
      }
      return d;
    });
    dispatch(settingActions.update({
      category: 'alert',
      body: data
    }));
  };

  const handleRemove = (index) => {
    let data = alert.body.filter((d, i) => {
      if (i === index) {
        return false;
      }
      return true;
    });
    dispatch(settingActions.update({
      category: 'alert',
      body: data
    }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.space}>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Entity</TableCell>
                <TableCell>Perimeter Defender</TableCell>
                <TableCell>Flagged Vehicle</TableCell>
                <TableCell width="100%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alert.body.map((d, index) =>
                <TableRow key={index}>
                  <TableCell>
                    {d.type}
                  </TableCell>
                  <TableCell>{d.entity}</TableCell>
                  <TableCell>
                    <Switch
                      onChange={(e, value) => toggleSwitch(index, 'pd', value)}
                      checked={d.pd}
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      onChange={(e, value) => toggleSwitch(index, 'fv', value)}
                      checked={d.fv}
                      color="primary"/>
                  </TableCell>
                  <TableCell className={classes.alignLeft}>
                    <IconButton className={classes.margin} onClick={() => handleRemove(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => setAddForm(true)}
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}>
          Add
        </Button>
      </div>
      <Modal
        className={classes.modal}
        open={addForm}
        onClose={() => setAddForm(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 100 }}>
        <Fade in={addForm}>
          <Paper className={classes.root}>
            <div className={classes.space}>
              <FormikSelect formik={formik} options={['email', 'sms']} name="type" label="type" />
              <FormikInput formik={formik} name="entity" label="entity" />
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={formik.submitForm}>
                Submit
              </Button>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Alert;