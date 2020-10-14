import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PageHead from "components/_custom/pageHead";
import StatusBox from "components/_custom/statusBox";
import memberListAtom from "atoms/memberList";
import api from "containers/api";
import { useEffectOnlyOnce } from "util/custom";
import ConnectForm from "./connect";

const useStyles = makeStyles({
  filter: {
    padding: 16,
    '& .MuiInputBase-root': {
      height: 36,
      fontSize: 14
    },
    '& .MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#424242',
      color: 'white'
    },
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  }
});

const MemberList = () => {

  const classes = useStyles();
  const [memberList, setMemberList] = useRecoilState(memberListAtom);
  const [connectForm, setConnectForm] = useState(false);
  const [connectMember, setConnectMember] = useState(null);

  const search = async payload => {
    setMemberList({
      ...memberList,
      isLoading: true
    });
    const response = await api.post('/member/list', payload);
    if (response) {
      setMemberList({
        ...memberList,
        isLoading: false,
        init: true,
        items: response.data.items,
        pagination: response.data.meta,
        group: payload.group
      });
    } else {
      setMemberList({
        ...memberList,
        isLoading: false
      });
    }
  };

  useEffectOnlyOnce(() => {
    if (!memberList.init) {
      search({
        page: 1,
        limit: 10,
        group: memberList.group
      });
    }
  });

  const handleChangePage = (e, page) => {
    search({
      page: page + 1,
      limit: 10,
      group: memberList.group
    });
  };

  const handleChangeGroup = (e, value) => {
    if (value) {
      search({
        page: 1,
        limit: 10,
        group: value
      });
    }
  };

  const handleConnect = (member) => {
    setConnectForm(true);
    setConnectMember(member);
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/member/import">
            <Button
              color="primary"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              >
              Import
            </Button>
          </Link>
        </PageHead>
        <Paper className={classes.root}>
          <div className={classes.filter}>
            {/* <SimpleMenu defaultValue={memberList.group} values={['all', 'student', 'faculty']} onChange={handleChangeGroup}/> */}
            <ToggleButtonGroup
              size="small"
              value={memberList.group}
              onChange={handleChangeGroup}
              exclusive
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="student">Student</ToggleButton>
              <ToggleButton value="faculty">Faculty</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <StatusBox height={200} status={memberList.isLoading ? 'wait' : memberList.items.length === 0 ? 'empty' : ''}>
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
                  {memberList.items.map(member =>
                    <TableRow key={member.id}>
                      <TableCell>{member.first_name} {member.last_name}</TableCell>
                      <TableCell>{member.group}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        {member.vehicles.map(vehicle =>
                          <div className="text-uppercase" key={vehicle.id}>{vehicle.plate}</div>
                        )}
                      </TableCell>
                      <TableCell width={50}>
                        <Button variant="outlined" color="primary" onClick={() => handleConnect(member)}>
                          Connect
                        </Button>
                      </TableCell>
                      <TableCell width={50}>
                        <Link to={`/member/view/${member.id}`}>
                          <span>view</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={memberList.pagination.totalItems}
                rowsPerPage={10}
                rowsPerPageOptions={[10]}
                page={memberList.pagination.currentPage-1}
                onChangePage={handleChangePage}
              />
            </TableContainer>
          </StatusBox>
          <ConnectForm open={connectForm} onClose={() => setConnectForm(false)} member={connectMember} />
        </Paper>
      </div>
    </div>
  );
};

export default MemberList;