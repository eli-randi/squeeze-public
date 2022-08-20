import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { prettifySnakeCase } from "util/Utils";

export const ChoiceField: React.FC<{ fieldName: string; setField: (value: string) => void; formData: any; field: any; }> = ({ fieldName, setField, formData, field }) => {
  const prettyName = prettifySnakeCase(fieldName);
  return (
    <TextField
      required
      select
      value={formData[fieldName]}
      id={fieldName}
      fullWidth
      label={field.label || prettyName}
      placeholder={field.placeholder || prettyName}
      onChange={(e) => setField(e.target.value)}
    >
      {field.options.map((choice: string) => {
        return (
          <MenuItem key={choice} value={choice}>
            {prettifySnakeCase(choice)}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
