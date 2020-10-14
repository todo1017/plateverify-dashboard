import { useEffect } from "react";

export const useEffectOnlyOnce = func => useEffect(func, []);