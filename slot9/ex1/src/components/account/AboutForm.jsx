// src/components/account/AboutForm.jsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function AboutForm({ tried, value, onChange, errors }) {
  return (
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              value={value.firstName}
              onChange={(e) => onChange({ ...value, firstName: e.target.value })}
              isInvalid={tried && !!errors.firstName}
              placeholder="Enter your first name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              value={value.lastName}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
              isInvalid={tried && !!errors.lastName}
              placeholder="Enter your last name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          isInvalid={tried && !!errors.email}
          placeholder="you@example.com"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone *</Form.Label>
        <Form.Control
          type="tel"
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          isInvalid={tried && !!errors.phone}
          placeholder="0123456789"
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age *</Form.Label>
        <Form.Control
          type="number"
          value={value.age}
          onChange={(e) => onChange({ ...value, age: e.target.value })}
          isInvalid={tried && !!errors.age}
          placeholder="Enter your age"
        />
        <Form.Control.Feedback type="invalid">
          {errors.age}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => onChange({
            ...value,
            avatar: e.target.files?.[0] ?? null
          })}
        />
      </Form.Group>
    </Form>
  );
}

export default AboutForm;