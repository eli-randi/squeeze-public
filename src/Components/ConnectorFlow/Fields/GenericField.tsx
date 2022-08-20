import React from "react";
import { Grid } from "@mui/material";
import { StringField } from "./StringField";
import { ChoiceField } from "./ChoiceField";
import { APIChoiceField } from "./APIChoiceField";
import { CredentialField } from "./CredentialField";
import {GenericConnectorField, GenericConnectorFormData, GenericConnectorWidget} from "../../../types";

export const GenericField: React.FC<{ fieldName: string; setField: (value: string | number) => void; formData: GenericConnectorFormData; field: GenericConnectorField; widgets: GenericConnectorWidget[]; }> = ({ fieldName, setField, formData, field, widgets }) => {
  let component;
  const fieldType = field.type as string;
  if (fieldType === 'string') {
    component = (
      <StringField
        key={fieldName}
        fieldName={fieldName}
        setField={setField}
        field={field}
      />
    );
  }
  else if (fieldType === 'choice') {
    component = (
      <ChoiceField
        key={fieldName}
        field={field}
        fieldName={fieldName}
        setField={setField}
        formData={formData} />
    );
  }
  else if (fieldType === 'choice_from_api' && fieldName !== 'credential_id') {
    component = (
      <APIChoiceField
        key={fieldName}
        field={field}
        fieldName={fieldName}
        setField={setField}
        formData={formData} />
    );
  }
  else if (fieldName === 'credential_id') {
    component = (
      <CredentialField
        key={fieldName}
        field={field}
        fieldName={fieldName}
        setField={setField}
        formData={formData}
        widgets={widgets} />
    );
  }
  else
    component = null;

  return (
    <Grid item py={2}>
      {component}
    </Grid>
  );
};
