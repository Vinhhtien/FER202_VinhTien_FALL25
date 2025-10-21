import React, { useReducer } from "react";
import { Form, Button, Card, Container, Modal } from "react-bootstrap";

const initialState = {
  username: "",
  password: "",
  errors: {},       
  showModal: false, 
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action;
      // Khi nhập lại -> xóa lỗi của ô đó
      const { [field]: removed, ...restErrors } = state.errors;
      return { ...state, [field]: value, errors: restErrors };
    }
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SUBMIT_SUCCESS":
      return { ...state, showModal: true, errors: {} };
    case "CLOSE_MODAL":
      return { ...initialState };
    default:
      return state;
  }
}

// ✅ Hàm kiểm tra lỗi
function validate({ username, password }) {
  const errors = {};
  if (!username || username.trim() === "") {
    errors.username = "Vui Lòng nhập name!";
  }
  if (!password || password.trim() === "") {
    errors.password = "Vui Lòng Nhập pass!";
  }
  return errors;
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault(); // ngăn deload trang 
    const errs = validate(state);
    if (Object.keys(errs).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errs });
    } else {
      dispatch({ type: "SUBMIT_SUCCESS" });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <Card className="p-3 shadow-sm">
        <h3 className="text-center mb-3">Login Form</h3>

        <Form onSubmit={handleSubmit} className="text-start" > 
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={state.username}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "username",
                  value: e.target.value,
                })
              }
              isInvalid={!!state.errors.username}
              placeholder="Nhập username"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={state.password}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "password",
                  value: e.target.value,
                })
              }
              isInvalid={!!state.errors.password}
              placeholder="Nhập password"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card>

      {/* Modal thông báo */}
      <Modal
        show={state.showModal}
        onHide={() => dispatch({ type: "CLOSE_MODAL" })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Xin chào, {state.username}! 
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
