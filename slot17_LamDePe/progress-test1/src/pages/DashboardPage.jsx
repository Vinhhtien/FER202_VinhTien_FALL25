import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationHeader />
      <DashboardPage/>
      <Container>
        <FilterBar />
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
            <span>Payments</span>
            <Button size="sm" onClick={() => navigate('/payments/add')}>Add Payment</Button>
          </Card.Header>
          <Card.Body>
            <PaymentTable />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DashboardPage;
