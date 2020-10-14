import React from "react";
import * as moment from "moment";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import StatusBox from "components/_custom/statusBox";

const VisitHistory = ({ records }) => {

  const sorted = records.map(r => r).sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });

  return (
    <StatusBox height={100} status={records.length === 0 ? 'empty' : ''}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Direction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map(record => (
              <TableRow key={record.id}>
                <TableCell component="th" scope="row">
                  {moment(record.created_at).format('MM/DD/YY | hh:mm A')}
                </TableCell>
                <TableCell>{record.meta.location}</TableCell>
                <TableCell>{record.meta.direction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StatusBox>
  );
};

export default VisitHistory;