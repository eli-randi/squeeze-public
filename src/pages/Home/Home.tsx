import PageLayout from '../../Components/PageLayout/PageLayout'
import { ConnectorsList } from '../../Connectors/ConnectorsList'

const Home = () => {
  return (
    <PageLayout title="Connector List" speedDial>
      <ConnectorsList />
    </PageLayout>
  );
};

export default Home;
