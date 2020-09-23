import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import VerticalLayout from "./verticalLayout";
import indigoTheme from "./themes/indigoTheme";
import "assets/vendors/style";

const applyTheme = createMuiTheme(indigoTheme);

const SchoolLayout = ({ children }) => {
  return (
    <ThemeProvider theme={applyTheme}>
      <VerticalLayout>
        {children}
      </VerticalLayout>
    </ThemeProvider>
  );
};

export default SchoolLayout;
