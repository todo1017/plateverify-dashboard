import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as moment from "moment";

export default function Visit({ records }) {
  
  const sorted = records.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  })

  return (
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
  );
}
