import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const AccordianHead = () => <></>;
export const AccordianBody = () => <></>;

export const AccordianItem = ({ tabkey, tab, onClick, children }) => {

  const [head, setHead] = useState(null);
  const [body, setBody] = useState(null);

  useEffect(() => {
    const temp = children.length ? children : [children];
    const heads = temp.filter(child => child.type.name === 'AccordianHead');
    const bodies = temp.filter(child => child.type.name === 'AccordianBody');
    setHead(heads[0] || null);
    setBody(bodies[0] || null);
  }, [children]);

  return (
    <React.Fragment>
      {head &&
        <ListItem button onClick={onClick}>
          <ListItemIcon>
            {tabkey === tab? <ExpandMoreIcon/> : <ChevronRightIcon />}
          </ListItemIcon>
          <ListItemText>
            {head.props.children}
          </ListItemText>
        </ListItem>
      }
      {body &&
        <Collapse in={tabkey === tab}>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText>
              {body.props.children}
            </ListItemText>
          </ListItem>
        </Collapse>
      }
    </React.Fragment>
  );
};

export const Accordian = ({ children }) => {

  const [childs, setChilds] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (children.length) {
      const filtered = children.filter(child => child.type.name === 'AccordianItem');
      setChilds(filtered);
    } else {
      if (children.type.name === 'AccordianItem') {
        setChilds([children]);
      }
    }
  }, [children]);

  return (
    <List>
      {childs.map((child, index) =>
        <AccordianItem
          key={index}
          tabkey={index}
          tab={tab}
          onClick={() =>setTab(index)}
          {...child.props}
        />
      )}
    </List>
  );
};