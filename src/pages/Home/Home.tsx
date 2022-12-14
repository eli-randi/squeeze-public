import { Connectors } from 'Components/Connectors';
import PageLayout from '../../Components/PageLayout/PageLayout'

const Home = () => {
  return (
    <PageLayout title="Connector List" speedDial>
      <Connectors />
    </PageLayout>
  );
};

export default Home;
