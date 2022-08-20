import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { prettifySnakeCase } from "util/Utils";
import {GenericConnectorField, GenericConnectorFormData} from "../../../types";

export const ChoiceField: React.FC<{ fieldName: string; setField: (value: string) => void; formData: GenericConnectorFormData; field: GenericConnectorField; }> = ({ fieldName, setField, formData, field }) => {
  const prettyName = prettifySnakeCase(fieldName);
  return (
    <TextField
      required
      select
      value={formData[fieldName]}
      id={fieldName}
      fullWidth
      label={field.label || prettyName}
      placeholder={(field.placeholder || prettyName) as string}
      onChange={(e) => setField(e.target.value)}
    >
      {Array.isArray(field.options) && field.options.map((choice: string) => {
        return (
          <MenuItem key={choice} value={choice}>
            {prettifySnakeCase(choice)}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
