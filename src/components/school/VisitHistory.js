import React, { useState, useEffect } from 'react';
import * as moment from "moment";
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import PaperHeader from "components/PaperHeader";

const VisitHistory = ({ data, noHead }) => {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const temp = data.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return -1;
      }
      return 1;
    });
    setRecords(temp);
  }, [ data ]);

  return (
    <React.Fragment>
      {!noHead &&
        <PaperHeader>
          Visit History
        </PaperHeader>
      }
      <TableContainer>
        <Table>
          <TableBody>
            {records.map(record => (
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
    </React.Fragment>
  );
}

export default VisitHistory;