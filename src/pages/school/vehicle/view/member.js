import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PrivateLink from "components/link/private";

const VehicleMember = ({ member }) => {

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Member
      </AccordionSummary>
      <AccordionDetails>
        {member &&
          <PrivateLink roles={[]} to={`/member/view/${member.id}`}>
            <div>
              {member.first_name} {member.last_name}
            </div>
          </PrivateLink>
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default VehicleMember;