import React from "react";
import { TextField } from "@mui/material";
import { prettifySnakeCase } from "util/Utils";

export const StringField: React.FC<{ fieldName: string; setField: (value: string) => void; }> = ({ fieldName, setField }) => {
  const prettyName = prettifySnakeCase(fieldName);
  return (
    <TextField
      required
      id={fieldName}
      fullWidth
      label={prettyName}
      placeholder={prettyName}
      onChange={(e) => setField(e.target.value)} />
  );
};
