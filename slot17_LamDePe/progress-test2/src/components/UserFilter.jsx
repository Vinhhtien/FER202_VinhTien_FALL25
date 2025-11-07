import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';

const UserFilter = ({ value, onChange, roles = [], statuses = [] }) => {
  const handle = (field) => (e) => onChange({ ...value, [field]: e.target.value });

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header as="h5">User Filter</Card.Header>
      <Card.Body>
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              placeholder="Search by username or full name"
              value={value.kw}
              onChange={handle('kw')}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={value.role} onChange={handle('role')}>
              <option value="">All roles</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={value.status} onChange={handle('status')}>
              <option value="">All statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Select value={value.sortBy} onChange={handle('sortBy')}>
              <option value="username_asc">Username ↑</option>
              <option value="username_desc">Username ↓</option>
              <option value="fullName_asc">Full name ↑</option>
              <option value="fullName_desc">Full name ↓</option>
              <option value="role_asc">Role ↑</option>
              <option value="role_desc">Role ↓</option>
              <option value="status_asc">Status ↑</option>
              <option value="status_desc">Status ↓</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
