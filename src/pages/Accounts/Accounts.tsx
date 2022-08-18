import React from 'react';
import PageLayout from 'Components/PageLayout/PageLayout';
import { Credentials } from 'Credentials/Credentials';

const Accounts = () => {
  return (
    <PageLayout title='Credentials' speedDial>
      <Credentials />
    </PageLayout>
  );
};

export default Accounts