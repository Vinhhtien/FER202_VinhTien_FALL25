import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../contexts/PaymentContext';

const AddPayment = () => {
  const { user } = useAuth();
  const { addPayment } = usePaymentContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    semester: '',
    courseName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...formData,
        userId: user?.id,                 // lưu id chuỗi
        amount: parseFloat(formData.amount),
      };
      await addPayment(payload);
      navigate('/payments');
    } catch (err) {
      setError('Failed to add payment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header as="h5">Add New Payment</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="text" name="semester" value={formData.semester}
                onChange={handleChange} required placeholder="e.g. Fall 2025"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text" name="courseName" value={formData.courseName}
                onChange={handleChange} required placeholder="e.g. Web Development"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount (VND)</Form.Label>
              <Form.Control
                type="number" name="amount" value={formData.amount}
                onChange={handleChange} required min="0" placeholder="Enter amount in VND"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date" name="date" value={formData.date}
                onChange={handleChange} required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Payment'}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/payments')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPayment;
