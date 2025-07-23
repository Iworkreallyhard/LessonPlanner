import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function LoginRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      await axios.post(endpoint, { username, password });
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
      window.location.reload(); // Reload to trigger auth-protected component
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || 'Something went wrong.'));
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '10px', width: '100%' }}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
    </div>
  );
}

export default LoginRegister;
