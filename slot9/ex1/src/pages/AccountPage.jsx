// src/pages/AccountPage.jsx
import { useState, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import AboutForm from '../components/account/AboutForm';
import AccountForm from '../components/account/AccountForm';
import AddressForm from '../components/account/AddressForm';
import AppNavBar from '../components/AppNavBar';
import Container from 'react-bootstrap/Container';

// Validation helpers
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const nonEmpty = (v) => String(v ?? "").trim().length > 0;

export default function AccountPage() {
  // 0=About, 1=Account, 2=Address
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);

  const [about, setAbout] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    avatar: null
  });

  const [account, setAccount] = useState({
    username: '',
    password: '',
    confirm: '',
    question: "What is your first pet's name?",
    answer: '',
    showPwd: false,
    showConfirm: false
  });

  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
    country: ''
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
    if (!nonEmpty(address.zip)) e.zip = "Zip code is required";
    if (!nonEmpty(address.country)) e.country = "Country is required";
    return e;
  }, [address]);

  // Check if each step is valid
  const stepValid = [
    Object.keys(aboutErrors).length === 0,
    Object.keys(accountErrors).length === 0,
    Object.keys(addressErrors).length === 0
  ];

  const allValid = stepValid[0] && stepValid[1] && stepValid[2];
  const progress = [33, 67, 100][step];

  const onNext = () => {
    setTried(true);
    if (!stepValid[step]) {
      // Find first error field to focus (you can implement this if needed)
      return;
    }
    setStep((s) => Math.min(2, s + 1));
    setTried(false);
  };

  const onPrev = () => {
    setStep((s) => Math.max(0, s - 1));
    setTried(false);
  };

  const onFinish = () => {
    setTried(true);
    if (!allValid) return;
    
    const payload = {
      about,
      account: { ...account, showPwd: undefined, showConfirm: undefined },
      address,
    };
    console.log("SUBMIT:", payload);
    alert("Profile submitted successfully!");
  };

  return (
    <div>
      <AppNavBar/>
      <Container className="py-3">
        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4 mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Build Your Profile
              </h2>
            </div>

            <ProgressBar now={progress} className="mb-3" />

            <Nav variant="tabs" activeKey={step} className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey={0} onClick={() => setStep(0)}>
                  <i className="bi bi-person-circle me-1" /> About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={1} onClick={() => setStep(1)} disabled={step < 1 && !stepValid[0]}>
                  <i className="bi bi-lock me-1" /> Account
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={2} onClick={() => setStep(2)} disabled={step < 2 && !stepValid[1]}>
                  <i className="bi bi-geo-alt me-1" /> Address
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {step === 0 && (
              <AboutForm 
                tried={tried} 
                value={about} 
                onChange={setAbout}
                errors={aboutErrors}
              />
            )}
            
            {step === 1 && (
              <AccountForm 
                tried={tried} 
                value={account} 
                onChange={setAccount}
                errors={accountErrors}
              />
            )}
            
            {step === 2 && (
              <AddressForm 
                tried={tried} 
                value={address} 
                onChange={setAddress}
                errors={addressErrors}
              />
            )}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={onPrev} disabled={step === 0}>
                Previous
              </Button>
              
              {step < 2 ? (
                <Button 
                  variant="primary" 
                  onClick={onNext}
                  disabled={!stepValid[step]}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  variant="success" 
                  onClick={onFinish}
                  disabled={!stepValid[step]}
                >
                  Finish
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}