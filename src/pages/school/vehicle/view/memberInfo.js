import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GroupIcon from '@material-ui/icons/Group';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import StatusBox from "components/_custom/statusBox";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  icon: {
    width: 40,
    textAlign: 'center'
  }
});

const MemberInfo = ({ member }) => {

  const classes = useStyles();

  return (
    <StatusBox height={100} status={member ? '' : 'empty'} padding={0}>
      {member &&
        <div className={classes.space}>
          <Link to={`/member/view/${member.id}`}>
            <OpenInNewIcon className={classes.icon} />
            <span>{member.first_name} {member.last_name}</span>
          </Link>
          <div>
            <GroupIcon className={classes.icon} />
            {member.group.toUpperCase()}
          </div>
          <div>
            <EmailIcon className={classes.icon} />
            {member.email || 'No Email'}
          </div>
          <div>
            <PhoneAndroidIcon className={classes.icon} />
            {member.phone || 'No Phone'}
          </div>
        </div>
      }
    </StatusBox>
  );
};

export default MemberInfo;