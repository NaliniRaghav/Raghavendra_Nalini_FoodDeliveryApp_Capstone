import { useState } from 'react';

const HomePageLogin = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    if (signUpMode) {
      if (!form.email) return "Email is required.";
      if (form.password.length < 6) return "Password must be at least 6 characters long.";
      if (form.password !== form.confirmPassword) return "Passwords don't match.";
    } else {
      if (!form.email) return "Email is required.";
      if (!form.password) return "Password is required.";
    }
    return '';
  };

  // Simulate login or sign-up submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    // Simulate an API call
    setTimeout(() => {
      if (signUpMode) {
        // Simulated backend check for existing user
        if (form.email === 'user@example.com') {
          setError("Email is already in use. Please choose another.");
        } else {
          alert('Account created successfully! You can now log in.');
          setSignUpMode(false);
          setForm({ email: '', password: '', confirmPassword: '' });
          setError('');  
        }
      } else {
        // Simulated login check
        if (form.email === 'user@example.com' && form.password === 'password123') {
          setLoggedIn(true);
          setError('');
        } else {
          
          setError('Invalid email or password. Please try again.');
        }
      }
      setLoading(false);
    }, 1000);
  };

  // Simulate password reset submission
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated backend check for email
    setTimeout(() => {
      if (form.email === 'user@example.com') {
        alert('Password reset link has been sent to your email.');
        setResetMode(false);
      } else {
        setError('Email not found. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  // Switch to reset password mode
  const handleForgotPassword = () => {
    setResetMode(true);
    setForm({ ...form, password: '', confirmPassword: '' });  
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <div>
          <h1>Welcome to the Food Delivery App</h1>
          <p>Browse restaurants, order food, and enjoy fast delivery!</p>
        </div>
      ) : (
        <div>
          <h1>{signUpMode ? 'Sign Up' : resetMode ? 'Reset Password' : 'Login'}</h1>
          <form onSubmit={resetMode ? handleResetSubmit : handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            {!resetMode && (
              <>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {signUpMode && (
                  <div>
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading
                ? 'Submitting...'
                : resetMode
                ? 'Reset Password'
                : signUpMode
                ? 'Sign Up'
                : 'Login'}
            </button>
          </form>

          {!resetMode && (
            <div>
              {signUpMode ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setSignUpMode(false);
                      setForm({ email: form.email, password: '', confirmPassword: '' });
                      setError('');  
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'blue',
                      cursor: 'pointer',
                    }}
                  >
                    Log In
                  </button>
                </p>
              ) : (
                <>
                  <p>
                    Don’t have an account?{' '}
                    <button
                      onClick={() => {
                        setSignUpMode(true);
                        setForm({ email: '', password: '', confirmPassword: '' });
                        setError('');  
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'blue',
                        cursor: 'pointer',
                      }}
                    >
                      Sign Up
                    </button>
                  </p>
                  <p>
                    <button
                      onClick={handleForgotPassword}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'blue',
                        cursor: 'pointer',
                      }}
                    >
                      Forgot Password?
                    </button>
                  </p>
                </>
              )}
            </div>
          )}

          {resetMode && (
            <p>
              <button
                onClick={() => setResetMode(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'blue',
                  cursor: 'pointer',
                }}
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePageLogin;
