import React from "react";
import MomentUtils from "@date-io/moment";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import VerticalLayout from "./verticalLayout";
import indigoTheme from "./themes/indigoTheme";
import "assets/vendors/style";

const applyTheme = createMuiTheme(indigoTheme);

const SchoolLayout = ({ children }) => {
  return (
    <ThemeProvider theme={applyTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <VerticalLayout>
          {children}
        </VerticalLayout>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default SchoolLayout;
