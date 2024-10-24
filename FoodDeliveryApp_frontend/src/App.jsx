import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpForm from './pages/SignUpForm';
import PasswordResetPage from '.pages/PasswordResetPage';
import RestaurantForm from '.pages/RestaurantForm';

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <LoginPage setCurrentForm={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <SignupPage setCurrentForm={setCurrentForm} />;
      case 'reset':
        return <PasswordResetPage setCurrentForm={setCurrentForm} />;
      case 'restaurant':
        return <RestaurantForm />;
      default:
        return <LoginPage setCurrentForm={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="app-container">
      {renderForm()}
    </div>
  );
};

export default App;