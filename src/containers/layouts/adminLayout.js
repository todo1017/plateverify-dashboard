import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import purpleTheme from "./themes/purpleTheme";
import VerticalLayout from "./verticalLayout";
import "assets/vendors/style";

const applyTheme = createMuiTheme(purpleTheme);

const AdminLayout = ({ children }) => {

  return (
    <ThemeProvider theme={applyTheme}>
        <VerticalLayout>
          {children}
        </VerticalLayout>
    </ThemeProvider>
  );
};

export default AdminLayout;
