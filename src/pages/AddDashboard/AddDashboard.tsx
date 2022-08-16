import React from "react";
import { BackButton } from "util/Utils";
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
