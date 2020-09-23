import React from "react";
import { isIOS, isMobile } from "react-device-detect";
import Header from "./header";
import Sidebar from "./sidebar";

const VerticalLayout =(props)=> {

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }

    return (
      <div className="app-container fixed-drawer">
        <Sidebar/>
        <div className="app-main-container">
          <div className="app-header">
            <Header/>
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    );
  };

export default VerticalLayout;
