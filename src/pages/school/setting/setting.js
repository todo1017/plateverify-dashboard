import React from "react";
import { useRecoilState } from "recoil";
import { Paper, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import settingAtom from "atoms/settingAtom";
import api from "containers/api";
import StatusBox from "components/_custom/statusBox";
import { useEffectOnlyOnce } from "util/custom";
import AlertBox from "./alertBox";

const Setting = () => {

  const [setting, setSetting] = useRecoilState(settingAtom);

  useEffectOnlyOnce(() => {
    if (!setting.init) {
      const load = async () => {
        setSetting({
          ...setting,
          isLoading: true
        });
        const response = await api.post('/setting/all');
        if (response) {
          setSetting({
            ...setting,
            init: true,
            isLoading: false,
            alert: response.data.filter(item => item.category === 'alert')[0] || null
          });
        } else {
          setSetting({
            ...setting,
            isLoading: false
          });
        }
      };
      load();
    }
  });

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <StatusBox
          height={300}
          padding={0}
          type="circle"
          status={!setting.init || setting.isLoading? 'wait' : ''}
        >
          <Paper>
            <List>
              <ListItem>
                <ListItemText>
                  Alert Recipients
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  <AlertBox />
                </ListItemText>
              </ListItem>
            </List>
          </Paper>
        </StatusBox>
      </div>
    </div>
  );
};

export default Setting;