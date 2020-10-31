import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileOpen from "components/FileOpen";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    '& > *+*': {
      marginLeft: 16
    }
  },
  logo: {
    textAlign: 'center',
    '& > img': {
      width: 200,
      padding: 8,
      border: '1px dashed #673ab7',
      borderRadius: 6
    }
  },
});


const SchoolLogo = ({ school, loading, onUpdate }) => {

  const classes = useStyles();
  const [logo, setLogo] = useState(null);

  const handleLogoSelect = (file) => {
    setLogo(file);
    console.log(file);
  };

  const handleUpdate = () => {
    const success = onUpdate(logo);
    if (success) {
      setLogo(null);
    }
  };

  return (
    <div className={classes.space}>
      <div className={classes.buttons}>
        <FileOpen onSelect={handleLogoSelect} disabled={loading}>
          Select Logo
        </FileOpen>
        {logo && <span>{logo.name}</span>}
        {logo &&
          <Button
            color="secondary"
            variant="contained"
            onClick={handleUpdate}
          >
            Update
          </Button>
        }
      </div>
      {school.logo &&
        <div className={classes.logo}>
          <img src={school.logo} alt=""/>
        </div>
      }
    </div>
  );
};

export default SchoolLogo;