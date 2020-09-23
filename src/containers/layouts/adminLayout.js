import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import greenTheme from "./themes/greenTheme";
import VerticalLayout from "./verticalLayout";
import "assets/vendors/style";

const applyTheme = createMuiTheme(greenTheme);

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
