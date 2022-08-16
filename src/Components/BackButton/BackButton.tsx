import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const BackButton: React.FC<{url: string}> = ({url}) => {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />}
        sx={{ float: 'left', marginLeft: '10px', marginBottom: '20px', marginTop: '-10px' }}
        onClick={() => navigate(url)}
    >
        Back
    </Button>
  );
};

export default BackButton;