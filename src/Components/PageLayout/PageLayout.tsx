import React from "react";
import { Typography } from "@mui/material";
import { BasicSpeedDial } from "../SpeedDial";
import { ClippedDrawer } from "../ClippedDrawer";
import { RequireConnectors } from "Components/Providers/HasConnectors";

import './PageLayout.css'

const PageLayout: React.FC<PageLayoutProps> = ({ title, speedDial, children, showClippedDrawer = true, requireConnectors = true }) => {

  let components = (
    <>
      {title && <PageTitle title={title} />}
      {children}
      {speedDial && <BasicSpeedDial />}
    </>
  )

  if (showClippedDrawer) {
    components = (
      <div className="PageLayout">
        <ClippedDrawer />
        <div className="Components">
          {components}
        </div>
      </div>
    )
  }

  if (requireConnectors) {
    components = (
      <RequireConnectors>
        {components}
      </RequireConnectors>
    )
  }

  return components;
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography variant="h6" fontSize={24} align="left" marginLeft={5} marginTop={2} marginBottom={4}>
      {title}
    </Typography>
  );
};

export default PageLayout;

interface PageTitleProps {
  title: string;
}

interface PageLayoutProps {
  title?: string;
  speedDial?: boolean;
  children: JSX.Element;
  showClippedDrawer?: boolean;
  requireConnectors?: boolean;
}
