import React, {useState} from 'react';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


export function BasicSpeedDial() {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const handleSpeedDialOpen = () => setOpenSpeedDial(!openSpeedDial);

    const navigate = useNavigate();

  return (

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
        open={openSpeedDial}
        onClick={handleSpeedDialOpen}
      > 
          <SpeedDialAction
            key={'add-dashboard'}
            icon= {<DashboardCustomizeIcon />}
            tooltipTitle={'Add Dashboard'}
            onClick={(() => navigate('/add_dashboard'))}

          />
          <SpeedDialAction
            key={'add-connector'}
            icon= {<AddLinkIcon />}
            tooltipTitle={'Add Connector'}
            onClick={(() => navigate('/add_connector'))}

          />
      </SpeedDial>
  );
}