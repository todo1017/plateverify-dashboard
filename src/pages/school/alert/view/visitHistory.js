import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as moment from "moment";

const VisitHistory = ({ data }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([...data]);
  }, [ data ]);

  const sorted = items.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });

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
          {sorted.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {moment(item.created_at).format('MM/DD/YY | hh:mm A')}
              </TableCell>
              <TableCell>{item.meta.location}</TableCell>
              <TableCell>{item.meta.direction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VisitHistory;