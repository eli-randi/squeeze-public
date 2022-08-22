import { SelectConnector } from "Components/ConnectorFlow/SelectConnector";
import { LoadingAnimation } from "Components/ConnectorFlow/LoadingAnimation";

import './AddConnector.css'
import PageLayout from 'Components/PageLayout/PageLayout';

const AddConnector : React.FC<{showClippedDrawer?: boolean, requireConnectors?: boolean, shouldCreateDashboard?: boolean}> = ({showClippedDrawer = true, requireConnectors = true, shouldCreateDashboard = false}) => {

  return (
    <>
      <PageLayout showClippedDrawer={showClippedDrawer} requireConnectors={requireConnectors}>
          <SelectConnector shouldCreateDashboard={shouldCreateDashboard} />
      </PageLayout>
    </>

  );
};

export default AddConnector;
