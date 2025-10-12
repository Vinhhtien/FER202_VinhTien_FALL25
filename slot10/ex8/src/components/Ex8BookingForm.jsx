
import { useMemo, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Huế'];

export default function Ex8BookingForm() {
  // ====== STATE ======
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [from, setFrom] = useState('Hà Nội');
  const [to, setTo] = useState('Hà Nội');
  const [wayGo, setWayGo] = useState(false);   // Đi
  const [wayBack, setWayBack] = useState(false); // Về
  const [submitted, setSubmitted] = useState(null); // dữ liệu submit để show demo

  // ====== VALIDATION ======
  const nameError = useMemo(() => {
    if (fullName.trim().length === 0) return 'Vui lòng nhập họ tên.';
    if (fullName.trim().length < 5) return 'Phải nhập tối thiểu 5 ký tự.';
    return '';
  }, [fullName]);

  const addressError = useMemo(() => {
    if (address.trim().length === 0) return 'Vui lòng nhập địa chỉ.';
    return '';
  }, [address]);

  const canSubmit = useMemo(() => {
    // Ít nhất chọn 1 chiều (đi hoặc về), và không trùng điểm đi/đến
    const validWays = wayGo || wayBack;
    const diffRoute = from !== to;
    return !nameError && !addressError && validWays && diffRoute;
  }, [nameError, addressError, wayGo, wayBack, from, to]);

  // ====== HANDLERS ======
  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      fullName: fullName.trim(),
      address: address.trim(),
      from,
      to,
      ways: { go: wayGo, back: wayBack },
    };

    setSubmitted(payload);
    // Ở thực tế: gọi API ở đây
    // fetch('/api/bookings', {method:'POST', body: JSON.stringify(payload)})
  };

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Alert variant="warning" className="mb-3">
        <h1 className="h3 m-0">Form đặt vé máy bay</h1>
      </Alert>

      {/* Họ tên */}
      <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Họ tên</Form.Label>
        <InputGroup>
          <InputGroup.Text aria-label="user icon">👤</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            isInvalid={!!nameError}
          />
          <InputGroup.Text aria-label="currency suffix">vnd</InputGroup.Text>
          <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
        </InputGroup>
        <Form.Text muted>Phải nhập 5 ký tự, in hoa…</Form.Text>
      </Form.Group>

      {/* Địa chỉ */}
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Địa chỉ</Form.Label>
        <Form.Control
          type="text"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          isInvalid={!!addressError}
        />
        <Form.Control.Feedback type="invalid">{addressError}</Form.Control.Feedback>
        <Form.Text muted>Phải nhập 5 ký tự, in hoa…</Form.Text>
      </Form.Group>

      {/* Đi từ / Đến */}
      <Row className="g-2">
        <Form.Group as={Col} md={6} className="mb-3" controlId="from">
          <Form.Label>Đi từ</Form.Label>
          <Form.Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md={6} className="mb-3" controlId="to">
          <Form.Label>Đến</Form.Label>
          <Form.Select value={to} onChange={(e) => setTo(e.target.value)} isInvalid={from === to}>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Điểm đi và điểm đến không được trùng nhau.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      {/* Chọn chiều đi (Khứ hồi) */}
      <Form.Group className="mb-3">
        <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
        <div>
          <Form.Check
            inline
            type="checkbox"
            id="wayGo"
            label="Đi"
            checked={wayGo}
            onChange={(e) => setWayGo(e.target.checked)}
          />
          <Form.Check
            inline
            type="checkbox"
            id="wayBack"
            label="Về"
            checked={wayBack}
            onChange={(e) => setWayBack(e.target.checked)}
          />
        </div>
        {!wayGo && !wayBack && (
          <div className="text-danger small mt-1">Hãy chọn ít nhất 1 chiều (Đi hoặc Về)</div>
        )}
      </Form.Group>

      <Button type="submit" variant="primary" disabled={!canSubmit} className="w-100">
        Đặt vé
      </Button>

      {/* Demo show dữ liệu đã submit */}
      {submitted && (
        <Alert variant="info" className="mt-3">
          <div className="mb-1"><strong>Đã gửi:</strong></div>
          <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </Alert>
      )}
    </Form>
  );
}
