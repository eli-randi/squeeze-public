import React from "react";
import { Typography } from "@mui/material";
import { BasicSpeedDial } from "../SpeedDial";
import { ClippedDrawer } from "../ClippedDrawer";

const PageLayout : React.FC<PageLayoutProps> = ({ title, speedDial, children } ) => {
  return (
    <ClippedDrawer>
      <PageTitle title={title} />
      {children}
      {speedDial && <BasicSpeedDial />}
    </ClippedDrawer>
  );
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography variant="h6" fontSize={24} align="left" marginLeft={3} marginTop={2} marginBottom={4}>
      {title}
    </Typography>
  );  
};

export default PageLayout;

interface PageTitleProps {
  title: string;
}

interface PageLayoutProps {
  title: string;
  speedDial?: boolean;
  children: JSX.Element;
}
