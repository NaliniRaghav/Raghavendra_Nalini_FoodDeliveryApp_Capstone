import { useState } from 'react';

const LoginPage = ({ setCurrentForm, onLoginSuccess }) => {
   
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
       
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <button onClick={() => setCurrentForm('signup')}>Sign Up</button>
      </p>
      <p>
        Forgot your password? <button onClick={() => setCurrentForm('reset')}>Reset Password</button>
      </p>
    </div>
  );
};

export default LoginPage;