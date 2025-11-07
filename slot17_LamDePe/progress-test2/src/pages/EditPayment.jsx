import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { usePaymentContext } from '../contexts/PaymentContext';
import * as api from '../services/api';

const EditPayment = () => {
  const { id } = useParams();
  const { savePayment } = usePaymentContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    semester: '',
    courseName: '',
    amount: '',
    date: '',
    userId: null
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getPaymentById(id);
        setFormData({
          semester: data.semester || '',
          courseName: data.courseName || '',
          amount: data.amount ?? '',
          date: data.date || new Date().toISOString().split('T')[0],
          userId: data.userId ?? null
        });
      } catch {
        setErr('Failed to load payment.');
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await savePayment(id, { ...formData, amount: parseFloat(formData.amount) });
      navigate('/payments');
    } catch {
      setErr('Failed to update payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header as="h5">Edit Payment</Card.Header>
        <Card.Body>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control name="semester" value={formData.semester} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control name="courseName" value={formData.courseName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount (VND)</Form.Label>
              <Form.Control type="number" name="amount" min="0" value={formData.amount} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
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

export default EditPayment;
