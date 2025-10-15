
import { useMemo, useState } from "react";
import {
  Form, Button, Card, Container, Row, Col, Modal, Toast,
} from "react-bootstrap";

const usernameRegex = /^[A-Za-z0-9._]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hasUpper = /[A-Z]/;
const hasLower = /[a-z]/;
const hasDigit = /\d/;
const hasSpecial = /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/;

function validate(form) {
  const errors = {};
  const trimmedUser = form.username.trim();
  if (!trimmedUser || !usernameRegex.test(trimmedUser)) {
    errors.username = "Username ≥ 3 ký tự; chỉ gồm chữ/số/._; không khoảng trắng đầu/cuối.";
  }
  if (!emailRegex.test(form.email)) errors.email = "Email không đúng định dạng.";
  const pw = form.password;
  if (!(pw.length >= 8 && hasUpper.test(pw) && hasLower.test(pw) && hasDigit.test(pw) && hasSpecial.test(pw))) {
    errors.password = "Password ≥ 8 ký tự, có hoa/thường/số/ký tự đặc biệt.";
  }
  if (form.confirm !== form.password) errors.confirm = "Confirm password không khớp.";
  return errors;
}

export default function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const errors = useMemo(() => validate(form), [form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, confirm: true });
    if (isValid) {
      // reset -> bật lại để Toast luôn hiện (kể cả submit liên tiếp)
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
      setShowModal(true);
    }
  };

  const onCancel = () => {
    setForm({ username: "", email: "", password: "", confirm: "" });
    setTouched({});
  };

  return (
    <>
      <Container className="py-4" style={{backgroundColor: "#35618dff", minHeight: "100vh"}}>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card className="shadow-sm">
              <Card.Header><h4 className="mb-0">Đăng ký tài khoản</h4></Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="fUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      name="username"
                      value={form.username}
                      onChange={onChange}
                      onBlur={onBlur}
                      isInvalid={touched.username && !!errors.username}
                      placeholder="vd: tien"
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="fEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      onBlur={onBlur}
                      isInvalid={touched.email && !!errors.email}
                      placeholder="vd: a@example.com"
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="fPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      onBlur={onBlur}
                      isInvalid={touched.password && !!errors.password}
                      placeholder="Ít nhất 8 ký tự…"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <ul className="small text-muted mt-2 mb-0">
                      <li>≥ 8 ký tự</li>
                      <li>Có chữ hoa, chữ thường, chữ số và ký tự đặc biệt</li>
                    </ul>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="fConfirm">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirm"
                      value={form.confirm}
                      onChange={onChange}
                      onBlur={onBlur}
                      isInvalid={touched.confirm && !!errors.confirm}
                      placeholder="Nhập lại password"
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" disabled={!isValid}>Submit</Button>
                    <Button variant="outline-secondary" type="button" onClick={onCancel}>Cancel</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Toast: dùng position-fixed để luôn nổi trên modal/backdrop */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 2000 }}
      >
        <Toast
          show={showToast}
          bg="success"
          onClose={() => setShowToast(false)}
          delay={2000}   //2s
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Đăng ký thành công</Modal.Title></Modal.Header>
        <Modal.Body>
          <Card className="shadow-sm">
            <Card.Body>
              <div><strong>Username:</strong> {form.username.trim()}</div>
              <div><strong>Email:</strong> {form.email}</div>
              <div><strong>Password:</strong> ******</div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
