import BackButton from "Components/BackButton/BackButton";
import { Dashboard } from "Dashboards/Dashboard";
import PageLayout from "Components/PageLayout/PageLayout";

const AddDashboard = () => {
  return (
    <PageLayout>
      <>
        <BackButton url={"/dashboards"} />
        <Dashboard />
      </>
    </PageLayout>
  );
};

export default AddDashboard;
