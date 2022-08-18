import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const BackButton: React.FC<{url: string}> = ({url}) => {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />}
        sx={{ width: '20%', float: 'left', marginLeft: '2%', marginBottom: '2%'}}
        onClick={() => navigate(url)}
    >
        Back
    </Button>
  );
};

export default BackButton;