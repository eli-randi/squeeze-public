import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from "react";

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




export default function MouseOverPopover(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        fontSize={'0.875rem'}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {props.mainText}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{props.popoverText}.</Typography>
      </Popover>
    </div>
  );
}

export function formatTime (time) {
    return time.replace('Z', '').replace('T', ' ');
}