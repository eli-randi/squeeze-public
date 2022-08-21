import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const ConnectorDetails: React.FC<{
  fieldsToRender: (JSX.Element | null)[];
  onSubmit: (event: React.FormEvent) => void;
  onBackClick: () => void;
  connectorTypeLabel: string;
}> = ({ fieldsToRender, onSubmit, onBackClick, connectorTypeLabel }) => {
  const navigate = useNavigate();

  return (
    <div className="CreateDashboard">
      <h1>Create your {connectorTypeLabel} connector</h1>
      <div className="BackButton">
        <Button
          color="secondary"
          variant="outlined"
          onClick={onBackClick}
        >
          <KeyboardReturnIcon />
          Go back
        </Button>
      </div>
      <div className="CreateDashboardComponent">
        {fieldsToRender}
        <Button
          color="primary"
          variant="contained"
          sx={{ alignSelf: 'center', width: '50%' }}
          onClick={onSubmit}
        >
          Create Connector
        </Button>
        <p><a href='mailto:hello@thisissqueeze.com'>Need any help? Contact us!</a></p>
      </div>
    </div>
  );
};
