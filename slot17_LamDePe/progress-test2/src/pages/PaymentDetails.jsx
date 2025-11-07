import React, { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../services/api';

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getPaymentById(id);
        setPayment(data);
      } catch {
        setPayment(null);
      }
    })();
  }, [id]);

  if (!payment) {
    return (
      <Container className="py-4">
        <Card><Card.Body>Payment not found.</Card.Body></Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          <p><strong>Semester:</strong> {payment.semester}</p>
          <p><strong>Course:</strong> {payment.courseName}</p>
          <p><strong>Date:</strong> {payment.date}</p>
          <p><strong>Amount:</strong> {Number(payment.amount).toLocaleString('vi-VN')} VND</p>
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={() => navigate('/payments')}>Back</Button>
            <Button variant="warning" onClick={() => navigate(`/payments/${payment.id}/edit`)}>Edit</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentDetails;
