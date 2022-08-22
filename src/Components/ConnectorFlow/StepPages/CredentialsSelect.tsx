import React from "react";
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { GenericField } from "../Fields/GenericField";
import { GenericConnectorField, GenericConnectorFormData, GenericConnectorWidget } from "types";
import './CredentialSelect.css'

export const CredentialsSelect: React.FC<{ fieldName: string; setField: (value: string | number) => void; formData: GenericConnectorFormData; field: GenericConnectorField; widgets: GenericConnectorWidget[]; incrementStep: () => void; decrementStep: () => void; }> = ({ fieldName, setField, formData, field, widgets, incrementStep, decrementStep }) => {
  console.log(formData);

  const wrappedSetField = (value: string | number) => {
    setField(value);
    incrementStep();
  };

  return (
    <div className='CredentialChoice'>
      <h1>Link your account</h1>
      <p>We use your account to automatically sync data and keep your dashboard up to date.</p>
      <div className="BackButton">
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => {
            decrementStep();
          }}
        >
          <KeyboardReturnIcon />
          Go back
        </Button>
      </div>
      <GenericField
        fieldName={fieldName}
        field={field}
        setField={wrappedSetField}
        formData={formData}
        widgets={widgets} />
      <p>We will never post anything on your account or share your data.</p>
      <p>See our privacy policy <a target="_blank" href='https://www.thisissqueeze.com/privacy-policy'>here.</a></p>
    </div>
  );
};
