import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { ErrorContext } from "Components/Providers/Error";
import { APIGet } from "util/API";
import Loader from "Components/Loader";
import { Widget, GenericWidget } from "./Widget";

export const CredentialField: React.FC<{ fieldName: string; setField: (value: string | number) => void; formData: any; field: any; widgets: Widget[]; }> = ({ fieldName, setField, formData, field, widgets }) => {
  const errorContext = useContext(ErrorContext);
  const [APIChoices, setAPIChoices] = useState<null | { id: string | number; label: string; }[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);

  const prettyName = 'Account';

  const pollForCredentials = async () => {
    const apiResponse = await APIGet(field.url, errorContext);
    const latestCredentials: { id: string | number; label: string; }[] = apiResponse.data;
    const latestCredentialsIds = latestCredentials.map((cred) => cred.id);
    const apiChoiceIds = APIChoices?.map((cred) => cred.id) || [];
    const newCredentialsIds = latestCredentialsIds.filter((cred) => !apiChoiceIds.includes(cred));
    const newCredentialsId = newCredentialsIds && newCredentialsIds[0];
    if (newCredentialsId) {
      setField(newCredentialsId);
    }
  };


  useEffect(() => {
    if (!APIChoices) {
      let url = field.url;
      APIGet(url, errorContext).then((resp) => {
        setAPIChoices(resp.data);
        console.log(resp.data);
        setIsLoading(false);
      });

    }
  }, [APIChoices]);

  useEffect(() => {
    if (isPolling) {
      let interval = setInterval(pollForCredentials, 1000);
      return () => clearInterval(interval);
    }
  }, [isPolling]);


  if (isLoading) {
    return <Loader />;
  }

  if (!APIChoices || APIChoices.length === 0) {
    return (
      <div className="CredentialComponentWidgetOnly">
        <p>Connect your new account:</p>
        {widgets.map((widget) => {
          return <GenericWidget
            extraOnClick={() => setIsPolling(true)}
            widget={widget} />;
        })}
      </div>

    );
  }

  return (
    <div className="CredentialComponent">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <p>Connect your existing account:</p>
          <TextField
            required
            select
            value={formData[fieldName]}
            id={fieldName}
            fullWidth
            label={prettyName}
            placeholder={prettyName}
            onChange={(e) => setField(e.target.value)}
          >
            {APIChoices &&
              APIChoices.map((choice) => {
                return (
                  <MenuItem key={choice.id} value={choice.id}>
                    {choice.label}
                  </MenuItem>
                );
              })}
          </TextField>
        </Grid>
        <Grid item xs={1} alignSelf={"center"}>
        </Grid>
      </Grid>
      <div>
        <p>Connect a new account:</p>
        {widgets.map((widget) => {
          return <GenericWidget
            extraOnClick={() => setIsPolling(true)}
            widget={widget} />;
        })}
      </div>

    </div>

  );
};
