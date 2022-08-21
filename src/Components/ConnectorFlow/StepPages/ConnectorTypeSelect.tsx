import { MetaContext } from '../../Providers/MetaProvider';
import React, { useContext, useState } from "react";
import CustomizedInputBase from "../../SearchBar";
import { getConnectorIcon } from "../../../util/ConnectorIcons";

export const ConnectorTypeSelect: React.FC<{ selectConnectorType: (connectorType: string) => void; }> = ({ selectConnectorType }) => {
  const meta = useContext(MetaContext);
  const [searched, setSearched] = useState('');
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  // @ts-ignore
  let connectorsToRender = meta.fullMeta ? meta.fullMeta.connectors : [];

  if (searched) {
    //@ts-ignore
    connectorsToRender = connectorsToRender.filter((connector) => {
      return connector.label.toLowerCase().includes(searched.toLowerCase());
    });
  }

  return (
    <div>
      <h1>Choose your platform</h1>
      <div className="ConnectorSearchBar">
        <CustomizedInputBase
          sx={{ float: 'none', margin: 'auto' }}
          handleSearchInput={handleSearchInput} />
      </div>
      <div className="ConnectorTiles">
        {/* @ts-ignore */}
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
