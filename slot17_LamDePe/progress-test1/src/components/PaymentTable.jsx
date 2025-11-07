import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../contexts/PaymentContext';

const PaymentTable = () => {
  const navigate = useNavigate();
  const { paymentsView, removePayment, loading } = usePaymentContext();

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment?')) {
      await removePayment(id);
    }
  };

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Semester</th>
          <th>Course</th>
          <th>Date</th>
          <th className="text-end">Amount (VND)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!loading && paymentsView.map((p, i) => (
          <tr key={p.id}>
            <td>{i + 1}</td>
            <td>{p.semester}</td>
            <td>{p.courseName}</td>
            <td>{p.date}</td>
            <td className="text-end">{Number(p.amount || 0).toLocaleString('vi-VN')}</td>
            <td>
              <ButtonGroup size="sm">
                <Button variant="secondary" onClick={() => navigate(`/payments/${p.id}`)}>View</Button>
                <Button variant="warning" onClick={() => navigate(`/payments/${p.id}/edit`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
        {!loading && paymentsView.length === 0 && (
          <tr><td colSpan={6} className="text-center text-muted">No data</td></tr>
        )}
        {loading && (
          <tr><td colSpan={6} className="text-center">Loading...</td></tr>
        )}
      </tbody>
    </Table>
  );
};

export default PaymentTable;
