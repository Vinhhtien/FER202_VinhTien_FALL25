// src/components/account/AddressForm.jsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function AddressForm({ tried, value, onChange, errors }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Street *</Form.Label>
        <Form.Control
          type="text"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
          isInvalid={tried && !!errors.street}
          placeholder="Enter your street address"
        />
        <Form.Control.Feedback type="invalid">
          {errors.street}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              value={value.city}
              onChange={(e) => onChange({ ...value, city: e.target.value })}
              isInvalid={tried && !!errors.city}
              placeholder="Enter your city"
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code *</Form.Label>
            <Form.Control
              type="text"
              value={value.zip}
              onChange={(e) => onChange({ ...value, zip: e.target.value })}
              isInvalid={tried && !!errors.zip}
              placeholder="Enter your zip code"
            />
            <Form.Control.Feedback type="invalid">
              {errors.zip}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Country *</Form.Label>
        <Form.Select
          value={value.country}
          onChange={(e) => onChange({ ...value, country: e.target.value })}
          isInvalid={tried && !!errors.country}
        >
          <option value="">Select a country</option>
          <option>Vietnam</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Japan</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.country}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default AddressForm;