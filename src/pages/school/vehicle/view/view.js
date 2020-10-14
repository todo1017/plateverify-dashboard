import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Collapse } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import api from "containers/api";
import PageHead from "components/_custom/pageHead";
import StatusBox from "components/_custom/statusBox";
import vehicleViewAtom from "atoms/vehicleView";
import { useEffectOnlyOnce } from "util/custom";
import VehicleInfo from "./vehicleInfo";
import MemberInfo from "./memberInfo";
import VisitHistory from "./visitHistory";
import FlagHistory from "./flagHistory";

const VehicleView = () => {

  const { id } = useParams();
  const [vehicleView, setVehicleView] = useRecoilState(vehicleViewAtom);
  const [vehicleOpen, setVehicleOpen] = useState(true);
  const [memberOpen, setMemberOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);

  useEffectOnlyOnce(() => {
    const load = async () => {
      setVehicleView({
        ...vehicleView,
        isLoading: true
      });
      const response = await api.post('/vehicle/view', { id });
      if (response) {
        setVehicleView({
          ...vehicleView,
          isLoading: false,
          data: response.data
        });
      } else {
        setVehicleView({
          ...vehicleView,
          isLoading: false
        });
      }
    };
    load();
  });

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/vehicle">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}>
              List
            </Button>
          </Link>
        </PageHead>
        <Paper>
          <StatusBox
            height={200}
            padding={0}
            type="circle"
            status={vehicleView.isLoading ? 'wait' : vehicleView.data === null ? 'empty' : ''}
          >
            {vehicleView.data &&
              <div>
                <List>
                  <ListItem button onClick={() => setVehicleOpen(!vehicleOpen)}>
                    <ListItemIcon>
                      {vehicleOpen? <ExpandMoreIcon/> : <ChevronRightIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      Vehicle
                    </ListItemText>
                  </ListItem>
                  <Collapse in={vehicleOpen}>
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <VehicleInfo vehicle={vehicleView.data} />
                      </ListItemText>
                    </ListItem>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => setMemberOpen(!memberOpen)}>
                    <ListItemIcon>
                      {memberOpen? <ExpandMoreIcon/> : <ChevronRightIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      Member Information
                    </ListItemText>
                  </ListItem>
                  <Collapse in={memberOpen}>
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <MemberInfo member={vehicleView.data.member} />
                      </ListItemText>
                    </ListItem>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => setVisitOpen(!visitOpen)}>
                    <ListItemIcon>
                      {visitOpen? <ExpandMoreIcon/> : <ChevronRightIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      Visit History
                    </ListItemText>
                  </ListItem>
                  <Collapse in={visitOpen}>
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <VisitHistory records={vehicleView.data.records} />
                      </ListItemText>
                    </ListItem>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => setFlagOpen(!flagOpen)}>
                    <ListItemIcon>
                      {flagOpen? <ExpandMoreIcon/> : <ChevronRightIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      Flag History
                    </ListItemText>
                  </ListItem>
                  <Collapse in={flagOpen}>
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <FlagHistory />
                      </ListItemText>
                    </ListItem>
                  </Collapse>
                </List>
              </div>
            }
          </StatusBox>
        </Paper>
        {/* {vehicleState.view &&
          <>
            <Plate vehicle={vehicleState.view} />
            <Visit records={vehicleState.view.records} />
            <Flag vehicle={vehicleState.view} />
            <VehicleMember member={vehicleState.view.member} />
          </>
        } */}
      </div>
    </div>
  );
};

export default VehicleView;