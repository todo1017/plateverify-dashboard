import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import schoolAtom from "atoms/admin/school";
import { initAction as initSchoolAction } from "actions/admin/school";
import userAtom from "atoms/admin/user";
import { initAction, updateUserAction } from "actions/admin/user";
import api from "api";
import { Table, TableBody, TableCell, TableRow, IconButton, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DataBox from "components/DataBox";
import PageAddLink from "components/PageAddLink";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  filter: {
    padding: 16,
    '& .MuiTextField-root': {
      minWidth: 200,
    },
  }
});

const useEffectOnce = func => useEffect(func, []);

// const getSchoolName = (schools, id) => {
//   const school = schools.filter(s => s.id === id)[0];
//   return school ? school.name : '';
// };

const UserList = () => {

  const classes = useStyles();
  const schoolState = useRecoilValue(schoolAtom);
  const schoolInit = useRecoilCallback(initSchoolAction);

  const userState = useRecoilValue(userAtom);
  const userInit = useRecoilCallback(initAction);
  const userUpdate = useRecoilCallback(updateUserAction);

  const [isLoading, setIsLoading] = useState(false);
  const [schoolId, setSchoolId] = useState('admin');
  const [users, setUsers] = useState([]);

  useEffectOnce(() => {
    userInit();
    schoolInit();
  });

  const toggleUserActive = async (user) => {
    setIsLoading(true);
    const data = {
      ...user,
      active: !user.active
    }
    const response = await api.post('/user/update', data);
    if (response) {
      userUpdate(data);
    }
    setIsLoading(false);
  };

  const handleSchoolSelect = (e) => {
    setSchoolId(e.target.value);
  };

  useEffect(() => {
    const _users = userState.data.filter(user => {
      if (schoolId === 'admin') {
        return !user.schoolId;
      }
      return user.schoolId === schoolId;
    });
    setUsers(_users);
  }, [userState.data, schoolId]);

  return (
    <div className={classes.space}>
      <PageAddLink to="/admin/user/create">
        New
      </PageAddLink>
      <DataBox
        height={100}
        loading={userState.isLoading || schoolState.isLoading || isLoading}
        empty={userState.data.length === 0}
      >
        <div className={classes.filter}>
          <TextField
            select
            value={schoolId}
            onChange={handleSchoolSelect}
          >
            <MenuItem value="admin">ADMIN</MenuItem>
            {schoolState.data.map(school => (
              <MenuItem key={school.id} value={school.id}>
                {school.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Table>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                {/* <TableCell>
                  {user.schoolId ? getSchoolName(schoolState.data, user.schoolId) : 'ADMIN'}
                </TableCell> */}
                <TableCell style={{width:30}}>
                  {user.email !== 'admin@plateverify.com' &&
                    <IconButton
                      color={user.active ? 'primary' : 'default'}
                      onClick={() => toggleUserActive(user)}
                      disabled={isLoading}
                    >
                      {user.active?
                        <CheckBoxIcon />
                        :
                        <CheckBoxOutlineBlankIcon />
                      }
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataBox>
    </div>
  );
};

UserList.title = "Users";

export default UserList;