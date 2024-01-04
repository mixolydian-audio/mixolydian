import * as mixo from "@mixolydian/core";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    console.log(mixo.patch);
  }, []);

  return <span>Hi there</span>;
};
