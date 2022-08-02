import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export function prettifySnakeCase(str) {
    return str
        .split('_')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


export function openCredentialWindow(url) {
    return window.open(url, "MsgWindow", "width=500,height=500")
}

export function BackButton(props) {
    const navigate = useNavigate();
    return (
        <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />}
            sx={{ float: 'left', marginLeft: '10px', marginBottom: '20px', marginTop: '-10px' }}
            onClick={() => navigate(props.url)}
        >
            Back
        </Button>
    )
}

