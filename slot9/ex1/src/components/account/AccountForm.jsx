// src/components/account/AccountForm.jsx
import React from 'react';
import { Form, InputGroup, Button as BSButton, Row, Col } from 'react-bootstrap';

function AccountForm({ tried, value, onChange, errors }) {
  return (
    <Form>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Username *</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
              <Form.Control
                type="text"
                value={value.username}
                onChange={(e) => onChange({ ...value, username: e.target.value })}
                isInvalid={tried && !!errors.username}
                placeholder="your_username"
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password *</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
              <Form.Control
                type={value.showPwd ? "text" : "password"}
                value={value.password}
                onChange={(e) => onChange({ ...value, password: e.target.value })}
                isInvalid={tried && !!errors.password}
                placeholder="••••••"
              />
              <BSButton
                variant="outline-secondary"
                onClick={() => onChange({ ...value, showPwd: !value.showPwd })}
              >
                <i className={`bi bi-eye${value.showPwd ? '-slash' : ''}`}></i>
              </BSButton>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
              <Form.Control
                type={value.showConfirm ? "text" : "password"}
                value={value.confirm}
                onChange={(e) => onChange({ ...value, confirm: e.target.value })}
                isInvalid={tried && !!errors.confirm}
                placeholder="••••••"
              />
              <BSButton
                variant="outline-secondary"
                onClick={() => onChange({ ...value, showConfirm: !value.showConfirm })}
              >
                <i className={`bi bi-eye${value.showConfirm ? '-slash' : ''}`}></i>
              </BSButton>
              <Form.Control.Feedback type="invalid">
                {errors.confirm}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question *</Form.Label>
        <Form.Select
          value={value.question}
          onChange={(e) => onChange({ ...value, question: e.target.value })}
        >
          <option>What is your first pet's name?</option>
          <option>What is your favorite teacher's name?</option>
          <option>In what city were you born?</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer *</Form.Label>
        <Form.Control
          type="text"
          value={value.answer}
          onChange={(e) => onChange({ ...value, answer: e.target.value })}
          isInvalid={tried && !!errors.answer}
          placeholder="Enter your answer"
        />
        <Form.Control.Feedback type="invalid">
          {errors.answer}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default AccountForm;