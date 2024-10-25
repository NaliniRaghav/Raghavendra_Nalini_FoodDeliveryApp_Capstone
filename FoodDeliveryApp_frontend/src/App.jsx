import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RestaurantDisplayForm from './pages/RestaurantDisplayForm';
import ResetPasswordPage from './pages/PasswordResetPage';

function App() {
  const [currentForm, setCurrentForm] = useState('login');  

  return (
    <div>
      {currentForm === 'login' && <LoginPage setCurrentForm={setCurrentForm} />}
      {currentForm === 'restaurantDisplay' && <RestaurantDisplayForm />}
      {currentForm === 'reset' && <ResetPasswordPage setCurrentForm={setCurrentForm} />}
    </div>
  );
}

export default App;
