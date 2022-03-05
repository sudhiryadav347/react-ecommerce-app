import React from 'react';
import Statictextblock from './StaticTextBlock';
import { Col, Row } from 'react-bootstrap';
import DashboardTabs from './UI/DashboardTabs';

const Dashboard = () => {
  return (
    <Row>
      <Statictextblock isDashboard="true" />{' '}
      <Col md={{ span: 6 }}>
	  <DashboardTabs/>
      </Col>
    </Row>
  );
};

export default Dashboard;
