import { useNavigate } from "react-router-dom"
import { MetaContext } from "../../Components/Auth";
import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import { Grid, TextField, MenuItem, Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CustomizedInputBase from "../../Components/SearchBar";
import { getConnectorIcon } from "../../Connectors/ConnectorIcons";
import { openCredentialWindow, prettifySnakeCase } from "util/Utils";

import CreateConnectorStepper from "Components/ConnectorFlow/CreateConnectorStepper";

import './SelectConnector.css'
import { ErrorContext } from "Components/Error";
import { APIGet, APIPost, API_HOST } from "util/API";
import Loader from "Components/Loader";


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
        APIGet(url, errorContext).then((resp) => {
          setAPIChoices(resp.data)
          console.log(resp.data)
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

// @ts-ignore
const CredentialField: React.FC<{ fieldName: string, setField: (value: string | number) => void, formData: any, field: any, widgets: Widget[] }> =
  ({ fieldName, setField, formData, field, widgets }) => {
    const errorContext = useContext(ErrorContext);
    const [APIChoices, setAPIChoices] = useState<null | { id: string | number, label: string }[]>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPolling, setIsPolling] = useState(false);

    const prettyName = 'Account';

    const pollForCredentials = async () => {
      const apiResponse = await APIGet(field.url, errorContext);
      const latestCredentials: { id: string | number, label: string }[] = apiResponse.data;
      const latestCredentialsIds = latestCredentials.map((cred) => cred.id);
      const apiChoiceIds = APIChoices?.map((cred) => cred.id) || [];
      const newCredentialsIds = latestCredentialsIds.filter((cred) => !apiChoiceIds.includes(cred));
      const newCredentialsId = newCredentialsIds && newCredentialsIds[0];
      if (newCredentialsId) {
        setField(newCredentialsId)
      }
    }


    useEffect(() => {
      if (!APIChoices) {
        let url = field.url;
        APIGet(url, errorContext).then((resp) => {
          setAPIChoices(resp.data)
          console.log(resp.data)
          setIsLoading(false)
        });

      }
    }, [APIChoices]);

    useEffect(() => {
      if (isPolling) {
        let interval = setInterval(pollForCredentials, 1000);
        return () => clearInterval(interval);
      }
    }, [isPolling])


    if (isLoading) {
      return <Loader />
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

      )
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
  }


const GenericField: React.FC<{ fieldName: string, setField: (value: string | number) => void, formData: any, field: any, widgets: Widget[] }> =
  ({ fieldName, setField, formData, field, widgets }) => {
    let component;
    if (field.type === 'string') {
      component = (
        <StringField
          key={fieldName}
          fieldName={fieldName}
          setField={setField}
        />
      );
    }
    else if (field.type === 'choice') {
      component = (
        <ChoiceField
          key={fieldName}
          field={field}
          fieldName={fieldName}
          setField={setField}
          formData={formData}
        />
      );
    }
    else if (field.type = 'choice_from_api' && fieldName !== 'credential_id') {
      component = (
        <APIChoiceField
          key={fieldName}
          field={field}
          fieldName={fieldName}
          setField={setField}
          formData={formData}
        />
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
          widgets={widgets}
        />
      )
    }
    else component = null;

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

const GenericWidget: React.FC<{ widget: Widget, extraOnClick: () => void }> = ({ widget, extraOnClick }) => {
  switch (widget.type) {
    case "button":
      return (
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            extraOnClick();
            openCredentialWindow(API_HOST + widget.url)
          }}
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
  const handleSearchInput = (e) => {
    setSearched(e.target.value);
  }

  // @ts-ignore
  let connectorsToRender = meta.fullMeta ? meta.fullMeta.connectors : [];

  if (searched) {
    //@ts-ignore
    connectorsToRender = connectors.filter((connector) => {
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


const CredentialsSelect: React.FC<{ fieldName: string, setField: (value: string | number) => void, formData: any, field: any, widgets: Widget[], incrementStep: () => void, decrementStep: () => void }> =
  ({ fieldName, setField, formData, field, widgets, incrementStep, decrementStep }) => {
    console.log(formData)

    const wrappedSetField = (value: string | number) => {
      setField(value)
      setTimeout(() => incrementStep(), 500)
    }

    return (
      <div className='CredentialChoice'>
        <h1>Connect your account</h1>
        <div className="BackButton">
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              decrementStep()
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
          widgets={widgets}
        />
        <p>We will never post anything on your account or share your data.</p>
        <p>See our privacy policy <a target="_blank" href='https://www.thisissqueeze.com/privacy-policy'>here.</a></p>
      </div>
    )
  }




const ConnectorDetails: React.FC<{ fieldsToRender: any, onSubmit: (event: React.FormEvent) => void, onBackClick: () => void }> =
  ({ fieldsToRender, onSubmit, onBackClick }) => {
    const navigate = useNavigate();

    return (
      //@ts-ignore
      <div className="CreateDashboard">
        <h1>Add your connector</h1>
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
          <Button
            color="primary"
            variant="contained"
            className="SkipButton"
            onClick={() => navigate('/home')}>
            Skip for now
            <SkipNextIcon />
          </Button>
          {fieldsToRender}
          <Button
            color="primary"
            variant="contained"
            sx={{ alignSelf: 'center', width: '50%' }}
            onClick={() => onSubmit}
          >
            Create dashboard
          </Button>
          <p><a href='mailto:hello@thisissqueeze.com'>Need any help? Contact us!</a></p>
        </div>
      </div>
    )
  }


const doesHaveCredentialStep = (config: null | any) => {
  if(config) {
    return config.fields.hasOwnProperty('credential_id')
  } else return null;
  
}


export const SelectConnector : React.FC<{className : string}> = ({className}) => {
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
    if (!doesHaveCredentialStep(connectorConfig.current)) {
      setStep(prevStep => prevStep - 1)
    }
  }

  const onBackClick = () => {
    console.log('back click')
    if(doesHaveCredentialStep(connectorConfig.current)) {
      const setField = setFieldGenerator('credential_id');
      setField('');
    } 
    decrementStep();
  }

  const selectConnectorType = (connectorType: string) => {
    // @ts-ignore
    connectorConfig.current = meta.fullMeta.connectors.find(connector => connector.name === connectorType)
    setConnectorType(connectorType)
    incrementStep()
    if (!doesHaveCredentialStep(connectorConfig.current)) {
      incrementStep();
    }
  }



  const fields = connectorConfig.current ? connectorConfig.current.fields : {};
  const widgets: Widget[] = connectorConfig.current && connectorConfig.current.extra_widgets
    ? connectorConfig.current.extra_widgets
    : [];

  const fieldNames = Object.keys(fields);
  let initialFormData: any = {};

  fieldNames.forEach((fieldName) => (initialFormData[fieldName] = ""));
  const [formData, setFormData] = useState(initialFormData);

  function setFieldGenerator(fieldName: string) {
    const _setField = (value: string | number) => {
      let formDataCopy = Object.assign({}, formData);
      formDataCopy[fieldName] = value;
      setFormData(formDataCopy);
    };
    return _setField;
  }

  const fieldsToRender = Object.keys(fields).map((fieldName) => {
    // const setIsLoading = () => false;
    if (fieldName === 'credential_id') {
      return null;
    }

    return (
      <GenericField
        fieldName={fieldName}
        field={fields[fieldName]}
        setField={setFieldGenerator(fieldName)}
        formData={formData}
        widgets={widgets}
      />
    )

  });

  function handleSubmit(event: React.FormEvent) {
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
        setField={setFieldGenerator('credential_id')}
        formData={formData}
        widgets={widgets}
        incrementStep={incrementStep}
        decrementStep={decrementStep}
      />
    )

  } else if (step === 2) {
    currentStepComponent = <ConnectorDetails
      fieldsToRender={fieldsToRender}
      onSubmit={handleSubmit}
      onBackClick={onBackClick}
    />
  }

  const inputGlobalStyles = <GlobalStyles styles={{ '& .MuiInputBase-root': { backgroundColor: 'white', textAlign: 'left' } }} />

  return (
    //@ts-ignore
    <div className={className}>
      {inputGlobalStyles}
      <CreateConnectorStepper step={step} />
      {currentStepComponent}
    </div>

  )
}
