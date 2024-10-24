import  { useState } from 'react';

const PasswordResetPage = ({ setCurrentForm }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remembered your password? <button onClick={() => setCurrentForm('login')}>Login</button>
      </p>
    </div>
  );
};

export default PasswordResetPage;