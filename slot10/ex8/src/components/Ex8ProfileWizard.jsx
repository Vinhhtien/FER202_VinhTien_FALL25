// src/components/Ex8ProfileWizard.jsx
import { useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";

// ====== Helpers ======
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const nonEmpty = (v) => String(v ?? "").trim().length > 0;

const Mark = ({ ok }) => (
  <span
    className={ok ? "text-success" : "text-danger"}
    style={{ minWidth: 18, display: "inline-block" }}
  >
    {ok ? "✅" : "✗"}
  </span>
);

function Requirements({ items, title = "Requirements to continue" }) {
  return (
    <div className="mt-3">
      <div className="small text-uppercase text-muted fw-semibold mb-1">
        {title}
      </div>
      <ul className="list-unstyled small mb-0">
        {items.map((it) => (
          <li key={it.label} className="d-flex align-items-start gap-2">
            <Mark ok={it.ok} />{" "}
            <span className={it.ok ? "text-success" : "text-danger"}>
              {it.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ex8ProfileWizard() {
  // Step index: 0=About, 1=Account, 2=Address, 3=Finish
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);

  // ====== FORM STATE ======
  const [about, setAbout] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    avatar: null,
  });

  const [account, setAccount] = useState({
    username: "",
    password: "",
    confirm: "",
    question: "What is your first pet's name?",
    answer: "",
    showPwd: false,
    showConfirm: false,
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // ====== VALIDATION ======
  const aboutErrors = useMemo(() => {
    const e = {};
    if (!nonEmpty(about.firstName)) e.firstName = "First name is required";
    if (!nonEmpty(about.lastName)) e.lastName = "Last name is required";
    if (!emailOk(about.email)) e.email = "Invalid email";
    if (!nonEmpty(about.phone)) e.phone = "Phone is required";
    if (!nonEmpty(about.age)) e.age = "Age is required";
    else if (Number(about.age) < 16) e.age = "Age must be ≥ 16";
    return e;
  }, [about]);

  const accountErrors = useMemo(() => {
    const e = {};
    if (!nonEmpty(account.username)) e.username = "Username is required";
    if (!nonEmpty(account.password) || account.password.length < 6)
      e.password = "Min 6 characters";
    if (account.confirm !== account.password)
      e.confirm = "Passwords do not match";
    if (!nonEmpty(account.answer)) e.answer = "Answer is required";
    return e;
  }, [account]);

  const addressErrors = useMemo(() => {
    const e = {};
    if (!nonEmpty(address.street)) e.street = "Street is required";
    if (!nonEmpty(address.city)) e.city = "City is required";
    if (!nonEmpty(address.state)) e.state = "State is required";
    if (!nonEmpty(address.zip)) e.zip = "Zip code is required";
    if (!nonEmpty(address.country)) e.country = "Country is required";
    return e;
  }, [address]);

  // hợp lệ từng bước
  const stepValid = [
    Object.keys(aboutErrors).length === 0,   // step 0
    Object.keys(accountErrors).length === 0, // step 1
    Object.keys(addressErrors).length === 0, // step 2
    // step 3 (Finish) hợp lệ nếu tất cả bước trước hợp lệ
    // (để dùng cho state nút Finish)
    false,
  ];
  const allValid = stepValid[0] && stepValid[1] && stepValid[2];

  // progress theo 4 bước
  const stepCount = 4;
  const progress = Math.round((step / (stepCount - 1)) * 100); // 0,33,66,100

  // ====== helpers: id input lỗi đầu tiên để focus
  const firstErrorId = (s) => {
    if (s === 0) {
      if (aboutErrors.firstName) return "firstName";
      if (aboutErrors.lastName) return "lastName";
      if (aboutErrors.email) return "email";
      if (aboutErrors.phone) return "phone";
      if (aboutErrors.age) return "age";
    }
    if (s === 1) {
      if (accountErrors.username) return "username";
      if (accountErrors.password) return "password";
      if (accountErrors.confirm) return "confirm";
      if (accountErrors.answer) return "answer";
    }
    if (s === 2) {
      if (addressErrors.street) return "street";
      if (addressErrors.city) return "city";
      if (addressErrors.state) return "state";
      if (addressErrors.zip) return "zip";
      if (addressErrors.country) return "country";
    }
    return null;
  };

  // không cho nhảy tab tới bước mới nếu chưa valid
  const canGoTo = (targetIdx) => {
    if (targetIdx <= step) return true; // quay lại ok
    if (step === 0 && !stepValid[0]) return false;
    if (step === 1 && !stepValid[1]) return false;
    if (step === 2 && !stepValid[2]) return false;
    return true;
  };

  // ====== ACTIONS ======
  const next = () => {
    setTried(true);
    if (step <= 2 && !stepValid[step]) {
      const id = firstErrorId(step);
      if (id) document.getElementById(id)?.focus();
      return;
    }
    setStep((s) => Math.min(stepCount - 1, s + 1));
    setTried(false);
  };

  const prev = () => {
    setStep((s) => Math.max(0, s - 1));
    setTried(false);
  };

  const finish = () => {
    setTried(true);
    if (!allValid) {
      // quay về bước đầu tiên còn lỗi và focus
      for (const s of [0, 1, 2]) {
        const id = firstErrorId(s);
        if (id) {
          setStep(s);
          setTimeout(() => document.getElementById(id)?.focus(), 0);
          break;
        }
      }
      return;
    }
    const payload = {
      about,
      account: { ...account, showPwd: undefined, showConfirm: undefined },
      address,
    };
    // eslint-disable-next-line no-console
    console.log("SUBMIT:", payload);
    alert("Submitted! (Xem console để thấy payload)");
  };

  // ====== Checklist hiển thị điều kiện dưới mỗi bước ======
  const reqAbout = [
    { label: "First name is filled", ok: nonEmpty(about.firstName) },
    { label: "Last name is filled", ok: nonEmpty(about.lastName) },
    { label: "Valid email format", ok: emailOk(about.email) },
    { label: "Phone is filled", ok: nonEmpty(about.phone) },
    { label: "Age ≥ 16", ok: nonEmpty(about.age) && Number(about.age) >= 16 },
  ];
  const reqAccount = [
    { label: "Username is filled", ok: nonEmpty(account.username) },
    {
      label: "Password length ≥ 6",
      ok: nonEmpty(account.password) && account.password.length >= 6,
    },
    {
      label: "Confirm matches password",
      ok: account.confirm === account.password && nonEmpty(account.confirm),
    },
    { label: "Secret answer is filled", ok: nonEmpty(account.answer) },
  ];
  const reqAddress = [
    { label: "Street is filled", ok: nonEmpty(address.street) },
    { label: "City is filled", ok: nonEmpty(address.city) },
    { label: "State is filled", ok: nonEmpty(address.state) },
    { label: "Zip code is filled", ok: nonEmpty(address.zip) },
    { label: "Country is selected", ok: nonEmpty(address.country) },
  ];

  // ====== RENDER ======
  return (
    <Card className="shadow-sm">
      <Card.Body>
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0 d-flex align-items-center gap-2">
            <span role="img" aria-label="user">
              👤
            </span>
            Build Your Profile
          </h2>
        </div>

        {/* Progress */}
        <ProgressBar now={progress} className="mb-3" />

        {/* Tabs header */}
        <Nav variant="tabs" activeKey={step} className="mb-3">
          {["About", "Account", "Address", "Finish"].map((label, idx) => (
            <Nav.Item key={label}>
              <Nav.Link
                eventKey={idx}
                onClick={() => canGoTo(idx) && setStep(idx)}
                disabled={idx > step && !canGoTo(idx)}
                className={idx < step ? "text-success" : ""}
              >
                {label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Step 0: About */}
        {step === 0 && (
          <section>
            <h5 className="mb-3 d-flex align-items-center gap-2">
              <span role="img" aria-label="about">
                👤
              </span>
              About Information
            </h5>

            <Row className="g-3">
              <Form.Group as={Col} md={6} controlId="firstName">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  required
                  value={about.firstName}
                  onChange={(e) =>
                    setAbout({ ...about, firstName: e.target.value })
                  }
                  isInvalid={tried && !!aboutErrors.firstName}
                  placeholder="Enter your first name"
                />
                <Form.Control.Feedback type="invalid">
                  {aboutErrors.firstName}
                </Form.Control.Feedback>
                {/* chữ đỏ kiểu Ex8FormPage */}
                {tried && aboutErrors.firstName && (
                  <div className="text-danger small mt-1">
                    {aboutErrors.firstName}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="lastName">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  required
                  value={about.lastName}
                  onChange={(e) =>
                    setAbout({ ...about, lastName: e.target.value })
                  }
                  isInvalid={tried && !!aboutErrors.lastName}
                  placeholder="Enter your last name"
                />
                <Form.Control.Feedback type="invalid">
                  {aboutErrors.lastName}
                </Form.Control.Feedback>
                {tried && aboutErrors.lastName && (
                  <div className="text-danger small mt-1">
                    {aboutErrors.lastName}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={about.email}
                  onChange={(e) =>
                    setAbout({ ...about, email: e.target.value })
                  }
                  isInvalid={tried && !!aboutErrors.email}
                  placeholder="you@example.com"
                />
                <Form.Control.Feedback type="invalid">
                  {aboutErrors.email}
                </Form.Control.Feedback>
                {tried && aboutErrors.email && (
                  <div className="text-danger small mt-1">{aboutErrors.email}</div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="phone">
                <Form.Label>Phone *</Form.Label>
                <Form.Control
                  required
                  value={about.phone}
                  onChange={(e) =>
                    setAbout({ ...about, phone: e.target.value })
                  }
                  isInvalid={tried && !!aboutErrors.phone}
                  placeholder="0123456789"
                />
                <Form.Control.Feedback type="invalid">
                  {aboutErrors.phone}
                </Form.Control.Feedback>
                {tried && aboutErrors.phone && (
                  <div className="text-danger small mt-1">{aboutErrors.phone}</div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="age">
                <Form.Label>Age *</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={about.age}
                  onChange={(e) => setAbout({ ...about, age: e.target.value })}
                  isInvalid={tried && !!aboutErrors.age}
                  placeholder="Enter your age"
                />
                <Form.Control.Feedback type="invalid">
                  {aboutErrors.age}
                </Form.Control.Feedback>
                {tried && aboutErrors.age && (
                  <div className="text-danger small mt-1">{aboutErrors.age}</div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setAbout({
                      ...about,
                      avatar: e.target.files?.[0] ?? null,
                    })
                  }
                />
              </Form.Group>
            </Row>

            <Requirements items={reqAbout} />
          </section>
        )}

        {/* Step 1: Account */}
        {step === 1 && (
          <section>
            <h5 className="mb-3 d-flex align-items-center gap-2">
              <span role="img" aria-label="lock">
                🔒
              </span>
              Account Information
            </h5>

            <Row className="g-3">
              <Form.Group as={Col} md={12} controlId="username">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  required
                  value={account.username}
                  onChange={(e) =>
                    setAccount({ ...account, username: e.target.value })
                  }
                  isInvalid={tried && !!accountErrors.username}
                  placeholder="your_username"
                />
                <Form.Control.Feedback type="invalid">
                  {accountErrors.username}
                </Form.Control.Feedback>
                {tried && accountErrors.username && (
                  <div className="text-danger small mt-1">
                    {accountErrors.username}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="password">
                <Form.Label>Password *</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    required
                    type={account.showPwd ? "text" : "password"}
                    value={account.password}
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                    isInvalid={tried && !!accountErrors.password}
                    placeholder="••••••"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setAccount({ ...account, showPwd: !account.showPwd })
                    }
                    title="Show/Hide"
                  >
                    👁
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  {accountErrors.password}
                </Form.Control.Feedback>
                {tried && accountErrors.password && (
                  <div className="text-danger small mt-1">
                    {accountErrors.password}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="confirm">
                <Form.Label>Confirm Password *</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    required
                    type={account.showConfirm ? "text" : "password"}
                    value={account.confirm}
                    onChange={(e) =>
                      setAccount({ ...account, confirm: e.target.value })
                    }
                    isInvalid={tried && !!accountErrors.confirm}
                    placeholder="••••••"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setAccount({
                        ...account,
                        showConfirm: !account.showConfirm,
                      })
                    }
                    title="Show/Hide"
                  >
                    👁
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  {accountErrors.confirm}
                </Form.Control.Feedback>
                {tried && accountErrors.confirm && (
                  <div className="text-danger small mt-1">
                    {accountErrors.confirm}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={12} controlId="question">
                <Form.Label>Secret Question *</Form.Label>
                <Form.Select
                  value={account.question}
                  onChange={(e) =>
                    setAccount({ ...account, question: e.target.value })
                  }
                >
                  <option>What is your first pet's name?</option>
                  <option>What is your favorite teacher's name?</option>
                  <option>In what city were you born?</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={12} controlId="answer">
                <Form.Label>Answer *</Form.Label>
                <Form.Control
                  required
                  value={account.answer}
                  onChange={(e) =>
                    setAccount({ ...account, answer: e.target.value })
                  }
                  isInvalid={tried && !!accountErrors.answer}
                  placeholder="Enter your answer"
                />
                <Form.Control.Feedback type="invalid">
                  {accountErrors.answer}
                </Form.Control.Feedback>
                {tried && accountErrors.answer && (
                  <div className="text-danger small mt-1">
                    {accountErrors.answer}
                  </div>
                )}
              </Form.Group>
            </Row>

            <Requirements items={reqAccount} />
          </section>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <section>
            <h5 className="mb-3 d-flex align-items-center gap-2">
              <span role="img" aria-label="pin">
                📍
              </span>
              Address Information
            </h5>

            <Row className="g-3">
              <Form.Group as={Col} md={12} controlId="street">
                <Form.Label>Street *</Form.Label>
                <Form.Control
                  required
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  isInvalid={tried && !!addressErrors.street}
                  placeholder="Enter your street address"
                />
                <Form.Control.Feedback type="invalid">
                  {addressErrors.street}
                </Form.Control.Feedback>
                {tried && addressErrors.street && (
                  <div className="text-danger small mt-1">
                    {addressErrors.street}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="city">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  required
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  isInvalid={tried && !!addressErrors.city}
                  placeholder="Enter your city"
                />
                <Form.Control.Feedback type="invalid">
                  {addressErrors.city}
                </Form.Control.Feedback>
                {tried && addressErrors.city && (
                  <div className="text-danger small mt-1">
                    {addressErrors.city}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="state">
                <Form.Label>State *</Form.Label>
                <Form.Control
                  required
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  isInvalid={tried && !!addressErrors.state}
                  placeholder="Enter your state/province"
                />
                <Form.Control.Feedback type="invalid">
                  {addressErrors.state}
                </Form.Control.Feedback>
                {tried && addressErrors.state && (
                  <div className="text-danger small mt-1">
                    {addressErrors.state}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="zip">
                <Form.Label>Zip Code *</Form.Label>
                <Form.Control
                  required
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                  isInvalid={tried && !!addressErrors.zip}
                  placeholder="Enter your zip/postal code"
                />
                <Form.Control.Feedback type="invalid">
                  {addressErrors.zip}
                </Form.Control.Feedback>
                {tried && addressErrors.zip && (
                  <div className="text-danger small mt-1">
                    {addressErrors.zip}
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="country">
                <Form.Label>Country *</Form.Label>
                <Form.Select
                  required
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  isInvalid={tried && !!addressErrors.country}
                >
                  <option value="">Select a country</option>
                  <option>Viet Nam</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Japan</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {addressErrors.country}
                </Form.Control.Feedback>
                {tried && addressErrors.country && (
                  <div className="text-danger small mt-1">
                    {addressErrors.country}
                  </div>
                )}
              </Form.Group>
            </Row>

            <Requirements items={reqAddress} />
          </section>
        )}

        {/* Step 3: Finish / Review */}
        {step === 3 && (
          <section>
            <h5 className="mb-3 d-flex align-items-center gap-2">
              <span role="img" aria-label="check">
                ✅
              </span>
              Review & Submit
            </h5>
            {!allValid && (
              <div className="text-danger mb-2">
                Please complete all required fields in previous steps to submit.
              </div>
            )}
            <h6>About Information</h6>
            <ul className="small">
              <li>
                <strong>First Name:</strong> {about.firstName || "—"}
              </li>
              <li>
                <strong>Last Name:</strong> {about.lastName || "—"}
              </li>
              <li>
                <strong>Email:</strong> {about.email || "—"}
              </li>
              <li>
                <strong>Phone:</strong> {about.phone || "—"}
              </li>
              <li>
                <strong>Age:</strong> {about.age || "—"}
              </li>
              <li>
                <strong>Avatar:</strong>{" "}
                {about.avatar ? about.avatar.name : "No file selected"}
              </li>
            </ul>

            <h6>Account Information</h6>
            <ul className="small">
              <li>
                <strong>Username:</strong> {account.username || "—"}
              </li>
              <li>
                <strong>Secret Question:</strong> {account.question || "—"}
              </li>
              <li>
                <strong>Answer:</strong> {account.answer || "—"}
              </li>
            </ul>

            <h6>Address Information</h6>
            <ul className="small">
              <li>
                <strong>Street:</strong> {address.street || "—"}
              </li>
              <li>
                <strong>City:</strong> {address.city || "—"}
              </li>
              <li>
                <strong>State:</strong> {address.state || "—"}
              </li>
              <li>
                <strong>Zip Code:</strong> {address.zip || "—"}
              </li>
              <li>
                <strong>Country:</strong> {address.country || "—"}
              </li>
            </ul>
          </section>
        )}

        {/* Footer buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={prev} disabled={step === 0}>
            Previous
          </Button>

          {step < stepCount - 1 ? (
            <Button
              variant="primary"
              onClick={next}
              disabled={step <= 2 ? !stepValid[step] : false}
            >
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={finish} disabled={!allValid}>
              Finish
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
