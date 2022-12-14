import React from "react";
import {Button} from "@mui/material";
import {openCredentialWindow} from "util/Utils";
import {API_HOST} from "util/API";
import {GenericConnectorWidget} from "../../../types";


export const GenericWidget: React.FC<{ widget: GenericConnectorWidget; extraOnClick: () => void; }> = ({ widget, extraOnClick }) => {
  switch (widget.type) {
    case "button":
      return (
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            extraOnClick();
            openCredentialWindow(API_HOST + widget.url);
          }}
        >
          {" "}
          {widget.label}{" "}
        </Button>
      );
    default:
      return null;
  }
};
