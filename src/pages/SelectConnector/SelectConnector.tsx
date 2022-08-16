import { useNavigate } from "react-router-dom"
import { MetaContext } from "../../Components/Auth";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid, Paper, Typography, Card, CardActionArea, CardContent, TextField, MenuItem, IconButton, Button } from "@mui/material";
import CustomizedInputBase from "../../Components/SearchBar";
import { getConnectorIcon } from "../../Connectors/ConnectorIcons";
import { openCredentialWindow, prettifySnakeCase } from "util/Utils";
import BackButton from "Components/BackButton/BackButton";
import CreateConnectorStepper from "Components/Stepper/CreateConnectorStepper";

import './SelectConnector.css'
import { ErrorContext } from "Components/Error";
import { APIGet, APIPost, API_HOST } from "util/API";


const StringField: React.FC<{ fieldName: string, setField: (value: string) => void }> = ({ fieldName, setField }) => {
  const prettyName = prettifySnakeCase(fieldName);
  return (
    <TextField
      required
      id={fieldName}
      fullWidth
      label={prettyName}
      placeholder={prettyName}
      onChange={(e) => setField(e.target.value)}
    />
  );
}

const ChoiceField: React.FC<{ fieldName: string, setField: (value: string) => void, formData: any, field: any }> =
  ({ fieldName, setField, formData, field }) => {
    const prettyName = prettifySnakeCase(fieldName);
    return (
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
        {field.options.map((choice: string) => {
          return (
            <MenuItem key={choice} value={choice}>
              {prettifySnakeCase(choice)}
            </MenuItem>
          );
        })}
      </TextField>
    );
  }

const APIChoiceField: React.FC<{ fieldName: string, setField: (value: string) => void, formData: any, field: any }> =
  ({ fieldName, setField, formData, field }) => {
    const errorContext = useContext(ErrorContext);
    const [APIChoices, setAPIChoices] = useState<null | { id: string | number, label: string }[]>(null);

    const prettyName = prettifySnakeCase(fieldName);

    let dependencyValues: string[] = [];
    field.depends_on &&
      field.depends_on.forEach((dependencyFieldName: string) =>
        dependencyValues.push(formData[dependencyFieldName])
      );

    const isReady = !dependencyValues.includes("");

    useEffect(() => {
      if (isReady && !APIChoices) {
        let url = field.url;
        field.depends_on &&
          field.depends_on.forEach(
            (dependencyFieldName: string) =>
            (url = url.replace(
              `{${dependencyFieldName}}`,
              formData[dependencyFieldName]
            ))
          );
        APIGet(url, errorContext).then((resp) => setAPIChoices(resp.data));
      }
    }, [isReady, APIChoices]);

    return (
      <Grid container justifyContent="center">
        <Grid item xs={11}>
          <TextField
            required
            disabled={!isReady}
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
    );
  }

const GenericField: React.FC<{ fieldName: string, setField: (value: string) => void, formData: any, field: any }> =
  ({ fieldName, setField, formData, field }) => {
    let component;
    switch (field.type) {
      case "string":
        component = (
          <StringField
            key={fieldName}
            fieldName={fieldName}
            setField={setField}
          />
        );
        break;
      case "choice":
        component = (
          <ChoiceField
            key={fieldName}
            field={field}
            fieldName={fieldName}
            setField={setField}
            formData={formData}
          />
        );
        break;
      case "choice_from_api":
        component = (
          <APIChoiceField
            key={fieldName}
            field={field}
            fieldName={fieldName}
            setField={setField}
            formData={formData}
          />
        );
        break;
      default:
        component = null;
    }
    return (
      <Grid item py={2}>
        {component}
      </Grid>
    );
  }

type Widget = {
  type: string;
  url: string;
  label: string;
}

const GenericWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  switch (widget.type) {
    case "button":
      return (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => openCredentialWindow(API_HOST + widget.url)}
        >
          {" "}
          {widget.label}{" "}
        </Button>
      );
    default:
      return null;
  }
}


const ConnectorTypeSelect: React.FC<{ selectConnectorType: (connectorType: string) => void }> = ({ selectConnectorType }) => {
  const meta = useContext(MetaContext);
  const [searched, setSearched] = useState('');
  //@ts-ignore
  let connectors = meta.fullMeta ? meta.fullMeta.connectors : [];

  //@ts-ignore
  const handleSearchInput = (e) => {
    setSearched(e.target.value);
  }

  let connectorsToRender = connectors;


  if (searched) {
    //@ts-ignore
    connectorsToRender = connectorsToRender.filter((connector) => {
      return connector.label.toLowerCase().includes(searched.toLowerCase())
    })
  }

  return (
    <div>
      <h1>Choose your platform</h1>
      <div className="ConnectorSearchBar">
        <CustomizedInputBase
          sx={{ float: 'none', margin: 'auto' }}
          handleSearchInput={handleSearchInput}
        />
      </div>
      <div className="ConnectorTiles">
        {/* @ts-ignore */}
        {connectorsToRender.map((connector) => {
          return (
            <div className="Tile"
              onClick={() => selectConnectorType(connector.name)}
            >
              <img src={getConnectorIcon(connector.name)} height='100px' alt="Social Media Icon" />
              <h3>{connector.label}</h3>
            </div>
          )
        })}
      </div>
      <p>Can’t see the connector you need or need any help?</p>
      <a href="mailto:hello@thisissqueeze.com">Contact us!</a>
    </div>
  )
}


const CredentialsSelect : React.FC<{ fieldName: string, setField: (value: string) => void, formData: any, field: any }> =
({ fieldName, setField, formData, field }) => {

  return (
    <div>
      <GenericField
        fieldName={fieldName}
        field={field}
        setField={setField}
        formData={formData}
      />
    </div>
  )
}


const ConnectorDetails = () => {
  return (
    <div>
      "Connector Details Step"
    </div>
  )
}


export const SelectConnector = () => {
  const meta = useContext(MetaContext);
  const errorContext = useContext(ErrorContext)
  const navigate = useNavigate();

  const [step, setStep] = useState(0)
  const [connectorType, setConnectorType] = useState<null | string>(null);
  const connectorConfig = useRef<null | any>(null);

  const incrementStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const decrementStep = () => {
    setStep(prevStep => prevStep - 1)
  }

  const selectConnectorType = (connectorType: string) => {
    // @ts-ignore
    connectorConfig.current = meta.fullMeta.connectors.find(connector => connector.name === connectorType)
    setConnectorType(connectorType)
    incrementStep()
    if (!connectorConfig.current.fields.hasOwnProperty('credential_id')) {
      incrementStep();
    }
  }

  const fields =  connectorConfig.current ? connectorConfig.current.fields : {};
  const widgets : Widget[] = connectorConfig.current && connectorConfig.current.extra_widgets 
    ? connectorConfig.current.extra_widgets
    : [];

  const fieldNames = Object.keys(fields);
  let initialFormData: any = {};

  fieldNames.forEach((fieldName) => (initialFormData[fieldName] = ""));
  const [formData, setFormData] = useState(initialFormData);

  function setField(fieldName: string) {
    const _setField = (value: string | number) => {
      let formDataCopy = Object.assign({}, formData);
      formDataCopy[fieldName] = value;
      setFormData(formDataCopy);
    };
    return _setField;
  }

  const fieldsToRender = Object.keys(fields).map((fieldName) => {
    return (
      <GenericField
        fieldName={fieldName}
        field={fields[fieldName]}
        setField={setField(fieldName)}
        formData={formData}
      />
    )

  });

  const extraWidgetsToRender = widgets.map((widget) => {
    return <GenericWidget widget={widget} />;
  });

  function handleSubmit(event : React.FormEvent) {
    event.preventDefault();
    const submitUrl = connectorConfig.current.submit_url;
    APIPost(submitUrl, formData, errorContext).then(() => navigate("/home"));
  }


  let currentStepComponent;

  if (step === 0) {
    currentStepComponent = (
      <ConnectorTypeSelect
        selectConnectorType={selectConnectorType}
      />
    )
  } else if (step === 1) {
    const credentialField = fields['credential_id']
    currentStepComponent = (credentialField && 
      <CredentialsSelect
        fieldName={'credential_id'}
        field={credentialField}
        setField={setField('credential_id')}
        formData={formData}

      />
      )
      
  } else if (step === 2) {
    currentStepComponent = <ConnectorDetails />
  }

  return (
    <div className="CreateConnectorPage">
      <CreateConnectorStepper step={step} />
      {currentStepComponent}
      {/* <button onClick={decrementStep}>Previous</button>
            <button onClick={incrementStep}>Next</button> */}
    </div>
  )
}
