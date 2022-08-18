import { SelectConnector } from "Components/ConnectorFlow/SelectConnector";

import './AddConnector.css'
import PageLayout from 'Components/PageLayout/PageLayout';

const AddConnector : React.FC<{showClippedDrawer?: boolean, requireConnectors?: boolean}> = ({showClippedDrawer = true, requireConnectors = true}) => {

  return (
    <>
      <PageLayout showClippedDrawer={showClippedDrawer} requireConnectors={requireConnectors}>
        <div>
          <SelectConnector/>
        </div>
      </PageLayout>
    </>

  );
};

export default AddConnector;
