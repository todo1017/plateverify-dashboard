import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as moment from "moment";

const Visit = ({ records }) => {

  const sorted = records.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Visit History
      </AccordionSummary>
      <AccordionDetails>
        {records.length > 0 ?
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
          </TableContainer> :
          <div className="p-4 text-center flex-fill">NO HISTORY</div>
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default Visit;