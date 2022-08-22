import { MetaContext } from '../../Providers/MetaProvider';
import React, { useContext, useState } from "react";
import CustomizedInputBase from "../../SearchBar";
import { getConnectorIcon } from "../../../util/ConnectorIcons";
import { connectorTypeToDashboardType } from '../SelectConnector';
import { ConnectorConfig } from '../../../types'

import './ConnectorTypeSelect.css'

export const ConnectorTypeSelect: React.FC<{ selectConnectorType: (connectorType: string) => void; shouldCreateDashboard: boolean}> = ({ selectConnectorType, shouldCreateDashboard }) => {
  const meta = useContext(MetaContext);
  const [searched, setSearched] = useState('');
  //@ts-ignore
  let connectorsToRender : ConnectorConfig[] = meta.fullMeta ? meta.fullMeta.connectors : [];
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };
  
  if(shouldCreateDashboard) {
    connectorsToRender = connectorsToRender.filter((connector) => {
     return Object.keys(connectorTypeToDashboardType).includes(connector.name)
    });
  }

  if (searched) {
    connectorsToRender = connectorsToRender.filter((connector) => {
      return connector.label.toLowerCase().includes(searched.toLowerCase());
    });
  }

  return (
    <div>
      <h1>Choose your platform</h1>
      <p>Which platform would you like to see in your dashboard?</p>
      <div className="ConnectorSearchBar">
        <CustomizedInputBase
          sx={{ float: 'none', margin: 'auto' }}
          handleSearchInput={handleSearchInput} />
      </div>
      <div className="ConnectorTiles">
        {connectorsToRender.map((connector) => {
          return (
            <div className="Tile"
              onClick={() => selectConnectorType(connector.name)}
            >
              <img src={getConnectorIcon(connector.name)} height='100px' alt="Social Media Icon" />
              <h3>{connector.label}</h3>
            </div>
          );
        })}
      </div>
      <p>Can’t see the connector you need or need any help?</p>
      <a href="mailto:hello@thisissqueeze.com">Contact us!</a>
    </div>
  );
};
