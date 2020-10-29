import React, { useEffect } from "react";
import pageAtom from "atoms/page";
import { useSetRecoilState } from "recoil";

const useEffectOnce = func => useEffect(func, []);

const ComponentWrap = (props) => {

  const setPageState = useSetRecoilState(pageAtom);

  useEffectOnce(() => {
    setPageState({ title: props.component.title });
  });
  
  return (
    <props.component />
  );
};

export default ComponentWrap;