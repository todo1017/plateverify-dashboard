import React, { useEffect } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import settingAtom from "atoms/school/setting";
import { initAction } from "actions/school/setting";
import { Accordian, AccordianItem, AccordianHead, AccordianBody } from "components/Accordian";
import DataBox from "components/DataBox";
import AlertSetting from "components/school/AlertSetting";

const useEffectOnce = func => useEffect(func, []);

const Setting = () => {

  const settingState = useRecoilValue(settingAtom);
  const settingInit = useRecoilCallback(initAction);

  useEffectOnce(() => {
    settingInit();
  });

  return (
    <DataBox height={100} loading={settingState.isLoading}>
      <Accordian>
        <AccordianItem>
          <AccordianHead>
            Alert Recipients
          </AccordianHead>
          <AccordianBody>
            <AlertSetting />
          </AccordianBody>
        </AccordianItem>
      </Accordian>
    </DataBox>
  );
};

export default Setting;
