import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilCallback } from "recoil";
import membersAtom from "atoms/school/members";
import { initAction, filterAction, paginateAction, updateFieldsAction } from "actions/school/members";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, TextField, MenuItem } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PageImportLink from "components/PageImportLink";
import DataBox from "components/DataBox";
import MemberConnect from "components/school/MemberConnect";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
    '& > *+*': {
      marginLeft: 16
    }
  },
  group: {
    width: 100
  },
  link: {
    width: 50,
    padding: 0
  },
  upperCase: {
    textTransform: 'uppercase'
  }
});

const MemberList = () => {

  const classes = useStyles();
  const membersState = useRecoilValue(membersAtom);
  const membersInit = useRecoilCallback(initAction);
  const membersFilter = useRecoilCallback(filterAction);
  const membersPaginate = useRecoilCallback(paginateAction);
  const membersUpdateFields = useRecoilCallback(updateFieldsAction);
  
  useEffectOnce(() => {
    membersInit();
  });

  const handleChangePage = (e, page) => membersPaginate(page+1);
  const handleChangeGroup = e => membersFilter(e.target.value);

  return (
    <div className={classes.space}>
      <PageImportLink to="/member/import">
        Import
      </PageImportLink>
      <DataBox
        height={100}
        loading={membersState.isLoading}
        empty={membersState.items.length === 0}
      >
        <div className={classes.filter}>
          <TextField
            select
            variant="outlined"
            size="small"
            className={classes.group}
            value={membersState.group}
            onChange={handleChangeGroup}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="faculty">Faculty</MenuItem>
          </TextField>
          <TablePagination
            component="div"
            count={membersState.pagination.totalItems}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            page={membersState.pagination.currentPage-1}
            onChangePage={handleChangePage}
          />
        </div>
        <TableContainer>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Vehicles</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersState.items.map(member =>
                <TableRow key={member.id}>
                  <TableCell>{member.first_name} {member.last_name}</TableCell>
                  <TableCell>{member.group}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>
                    {member.vehicles.map(vehicle =>
                      <div className={classes.upperCase} key={vehicle.id}>{vehicle.plate}</div>
                    )}
                  </TableCell>
                  <TableCell className={classes.link}>
                    <MemberConnect member={member} update={vehicles => membersUpdateFields(member, {vehicles})} />
                  </TableCell>
                  <TableCell className={classes.link}>
                    <Link to={`/member/view/${member.id}`}>
                      <IconButton color="primary">
                        <ArrowForwardIcon size="small" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DataBox>
    </div>
  );
};

export default MemberList;
