import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank1 from './components/QuestionBank1';
function App() {
  return (
    <div className="App">
      <CounterComponent/>
      <LightSwitch/>
      <LoginForm/>
      <SignUpForm/> <br/>
      <h2>Đây là QuestionBank bình thường</h2>
      <QuestionBank/>
      <h2>Đây là QuestionBank Full chức năng</h2>
      <QuestionBank1/>
      

    </div>
  );
}

export default App;
