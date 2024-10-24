import  { useState } from 'react';

const SignUpForm= ({ setCurrentForm }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={() => setCurrentForm('login')}>Login</button>
      </p>
    </div>
  );
};
}

export default SignUpForm;