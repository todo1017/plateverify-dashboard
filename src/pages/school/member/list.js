import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button
} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SimpleMenu from "components/menu/simple";
import PrivateLink from "components/link/private";
import memberActions from "store/school/member/actions";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  filterTop: {
    padding: 16
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const MemberList = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const memberState = useSelector(state => state.School.Member);

  useEffectOnce(() => {
    if (memberState.members.length === 0) {
      dispatch(memberActions.list({
        page: 1,
        limit: 10,
        group: memberState.group
      }));
    }
  });

  const handleChangePage = (e, page) => {
    dispatch(memberActions.list({
      page: page + 1,
      limit: 10,
      group: memberState.group
    }));
  };

  const handleChangeGroup = (newGroup) => {
    if (newGroup !== memberState.group) {
      dispatch(memberActions.list({
        page: 1,
        limit: 10,
        group: newGroup
      }));
    }
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink
            roles={['ROLE_MANAGE_ALL']}
            to="/member/import">
            <Button
              color="primary"
              variant="contained"
              startIcon={<CloudUploadIcon />}>
              Import
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.root}>
          <div className={classes.filterTop}>
            <SimpleMenu values={['all', 'student', 'faculty']} onChange={handleChangeGroup}/>
          </div>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Plates</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberState.members.map(member =>
                  <TableRow key={member.id}>
                    <TableCell>{member.first_name} {member.last_name}</TableCell>
                    <TableCell>{member.group}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell></TableCell>
                    <TableCell width={50}>
                      <PrivateLink roles={['ROLE_MANAGE_ALL']} to={`/member/view/${member.id}`}>
                        <Button variant="outlined" >
                          View
                        </Button>
                      </PrivateLink>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={memberState.pagination.totalItems}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              page={memberState.pagination.currentPage-1}
              onChangePage={handleChangePage}
            />
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default MemberList;