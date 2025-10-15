
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from    './components/LoginForm';
import SearchItem from './components/SearchItem';
import AccountsSearch from './components/AccountsSearch';
import SignupForm from './components/SignupForm';
function App() {
  return (
    <div>
      <CounterComponent/>
      <LightSwitch/>
      <LoginForm/>
      <LoginForm2/>
      <SearchItem/>
      <AccountsSearch/>
      <SignupForm/>
    </div>
  );
}

export default App;
