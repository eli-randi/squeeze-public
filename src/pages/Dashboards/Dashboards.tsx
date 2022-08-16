import PageLayout from "../../Components/PageLayout/PageLayout"
import {DashboardList} from '../../Dashboards/DashboardList'

const Dashboards = () => {
  return (
    <PageLayout title='Dashboards' speedDial>
      <DashboardList />
    </PageLayout>
  );
};

export default Dashboards