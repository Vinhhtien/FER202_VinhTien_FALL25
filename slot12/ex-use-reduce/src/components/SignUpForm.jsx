import React, { useReducer } from "react";
import { Form, Button, Card, Container, Modal } from "react-bootstrap";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm: "",
  errors: {},       
  showModal: false,  
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action;
      const { [field]: _, ...rest } = state.errors;
      return { ...state, [field]: value, errors: rest };
    }
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SUBMIT_OK":
      return { ...state, showModal: true, errors: {} };
    case "CLOSE_MODAL":
      return { ...initialState };
    default:
      return state;
  }
}

function validate({ username, email, password, confirm }) {
  const errs = {};
  if (!username || username.trim() === "") errs.username = "Vui lòng nhập Username!";
  if (!email || email.trim() === "" || !email.includes("@")) errs.email = "Email không hợp lệ!";
  if (!password || password.trim() === "") errs.password = "Vui lòng nhập Password!";
  if (!confirm || confirm.trim() === "") errs.confirm = "Vui lòng xác nhận Password!";
  else if (password !== confirm) errs.confirm = "Mật khẩu xác nhận không khớp!";
  return errs;
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(state);
    if (Object.keys(errs).length) {
      dispatch({ type: "SET_ERRORS", payload: errs });
    } else {
      dispatch({ type: "SUBMIT_OK" });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 440 }}>
      <Card className="p-3 shadow-sm">
        <h3 className="text-center mb-3">Sign Up</h3>

        <Form onSubmit={handleSubmit} noValidate className="text-start" >
          <Form.Group className="mb-3" controlId="suUser">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })
              }
              isInvalid={!!state.errors.username}
              placeholder="Nhập username"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="suEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
              }
              isInvalid={!!state.errors.email}
              placeholder="ví dụ: a@gmail.com"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="suPass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
              }
              isInvalid={!!state.errors.password}
              placeholder="Nhập password"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="suConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirm"
              value={state.confirm}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "confirm", value: e.target.value })
              }
              isInvalid={!!state.errors.confirm}
              placeholder="Nhập lại password"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.confirm}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Đăng ký
          </Button>
        </Form>
      </Card>

      <Modal
        show={state.showModal}
        onHide={() => dispatch({ type: "CLOSE_MODAL" })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Username:</strong> {state.username}</p>
          <p><strong>Email:</strong> {state.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
