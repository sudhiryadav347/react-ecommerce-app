import userEvent from '@testing-library/user-event';
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Changepassword from '../ChangePassword';

const DashboardTabs = () => {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-4 mt-4"
    >
      <Tab eventKey="home" title="Home">
        Welcome User.
      </Tab>
      <Tab eventKey="changePassword" title="Change Password">
        <Changepassword />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Contact tab.
      </Tab>
    </Tabs>
  );
};

export default DashboardTabs;
