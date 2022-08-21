import { SelectConnector } from "Components/ConnectorFlow/SelectConnector";
import { LoadingAnimation } from "Components/ConnectorFlow/LoadingAnimation";

import './AddConnector.css'
import PageLayout from 'Components/PageLayout/PageLayout';

const AddConnector : React.FC<{showClippedDrawer?: boolean, requireConnectors?: boolean}> = ({showClippedDrawer = true, requireConnectors = true}) => {

  return (
    <>
      <PageLayout showClippedDrawer={showClippedDrawer} requireConnectors={requireConnectors}>
          <SelectConnector/>
          {/* <LoadingAnimation /> */}
      </PageLayout>
    </>

  );
};

export default AddConnector;
