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

const MemberImport = () => {

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
      const response = await api.post('/member/parse', data);
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
    data.append('group', values.group);
    data.append('first_name', values.first_name);
    data.append('last_name', values.last_name);
    data.append('address', values.address);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('grade', values.grade);
    data.append('graduation', values.graduation);
    
    setIsLoading(true);
    const response = await api.post('/member/import', data);
    if (response) {
      setFailed(response.data.failed.length);
    }
    setIsLoading(false);
  };

  const autoFill = () => {
    const last = fields[fields.length-1];
    const options = ['group', 'first_name', 'last_name', 'address', 'email', 'phone', 'grade', 'graduation'];
    for (let i = 0; i < options.length; i++) {
      setValue(options[i], fields[i] || last);
    }
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/member">
        Members
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
              <CustomSelect errors={errors} control={control} options={fields} label="Group" name="group"/>
              <CustomSelect errors={errors} control={control} options={fields} label="First Name" name="first_name"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Last Name" name="last_name"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Address" name="address"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Email" name="email"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Phone" name="phone"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Grade" name="grade"/>
              <CustomSelect errors={errors} control={control} options={fields} label="Graduation" name="graduation"/>
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

export default MemberImport;