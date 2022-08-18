import { useNavigate } from "react-router-dom"
import { MetaContext } from '../Providers/MetaProvider'
import React, { useContext, useRef, useState } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CustomizedInputBase from "../SearchBar";
import { getConnectorIcon } from "../../Connectors/ConnectorIcons";

import CreateConnectorStepper from "Components/ConnectorFlow/CreateConnectorStepper";

import './SelectConnector.css'
import { ErrorContext } from "Components/Providers/Error";
import { APIPost } from "util/API";
import { GenericField } from "./Fields/GenericField";
import { Widget } from "./Fields/Widget";


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
          {/* <Button
            color="primary"
            variant="contained"
            className="SkipButton"
            onClick={() => navigate('/home')}>
            Optional add a dashboard
            <SkipNextIcon />
          </Button> */}
          {fieldsToRender}
          <Button
            color="primary"
            variant="contained"
            sx={{ alignSelf: 'center', width: '50%' }}
            onClick={() => onSubmit}
          >
            Create Connector
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
  console.log('field names:' + fieldNames)
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
    <div className='CreateConnectorPage'>
      {inputGlobalStyles}
      <CreateConnectorStepper step={step} />
      {currentStepComponent}
    </div>

  )
}
