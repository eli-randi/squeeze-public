import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { prettifySnakeCase } from "util/Utils";
import { ErrorContext } from "Components/Providers/Error";
import { APIGet } from "util/API";

export const APIChoiceField: React.FC<{ fieldName: string; setField: (value: string) => void; formData: any; field: any; }> = ({ fieldName, setField, formData, field }) => {
  const errorContext = useContext(ErrorContext);
  const [APIChoices, setAPIChoices] = useState<null | { id: string | number; label: string; }[]>(null);

  const prettyName = prettifySnakeCase(fieldName);

  let dependencyValues: string[] = [];
  field.depends_on &&
    field.depends_on.forEach((dependencyFieldName: string) => dependencyValues.push(formData[dependencyFieldName] || "")
    );

  const isReady = !dependencyValues.includes("");

  useEffect(() => {
    if (isReady && !APIChoices) {
      let url = field.url;
      field.depends_on &&
        field.depends_on.forEach(
          (dependencyFieldName: string) => (url = url.replace(
            `{${dependencyFieldName}}`,
            formData[dependencyFieldName]
          ))
        );
      APIGet(url, errorContext).then((resp) => {
        setAPIChoices(resp.data);
      });

    }
  }, [isReady, APIChoices]);


  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <TextField
          required
          disabled={!isReady}
          select
          value={formData[fieldName]}
          id={fieldName}
          fullWidth
          label={field.label || prettyName}
          placeholder={field.placeholder || prettyName}
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
  );
};
