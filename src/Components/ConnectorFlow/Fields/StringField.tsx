import React from "react";
import { TextField } from "@mui/material";
import { prettifySnakeCase } from "util/Utils";
import {GenericConnectorField} from "../../../types";

export const StringField: React.FC<{ fieldName: string; setField: (value: string) => void; field: GenericConnectorField;}> = ({ fieldName, setField, field }) => {
  const prettyName = prettifySnakeCase(fieldName);
  return (
    <TextField
      required
      id={fieldName}
      fullWidth
      label={field.label || prettyName}
      placeholder={(field.placeholder || prettyName) as string}
      onChange={(e) => setField(e.target.value)} />
  );
};
