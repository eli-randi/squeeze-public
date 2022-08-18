import GlobalStyles from '@mui/material/GlobalStyles';

import { SelectConnector } from "pages/SelectConnector/SelectConnector";
import { ClippedDrawer } from "Components/ClippedDrawer";

import './AddConnector.css'

const AddConnector = () => {
  const inputGlobalStyles = <GlobalStyles styles={{ '& .MuiBox-root': { padding: 0 } }} />

  return (
    <>
    {inputGlobalStyles}
    <ClippedDrawer className='ClippedDrawerAddConnector'>
      <div className="AddConnectorPortalPage">
        <SelectConnector className={'CreateConnectorPortal'}/>
      </div>
    </ClippedDrawer>
    </>
    
  );
};

export default AddConnector;
