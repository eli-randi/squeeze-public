import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import './CreateConnectorStepper.css'

const steps = [
    'Platform',
    'Authenticate',
    'Extra details'
];

export default function CreateConnectorStepper({step} : {step: number}) {
  return (
    <div className='Stepper'>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className='StepLabel'>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
