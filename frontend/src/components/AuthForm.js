import React, { useState } from 'react';

export default function AuthForm({ onAuth, mode = 'login' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await onAuth({ username, password, role });
    } catch (err) {
      setError(err.message || 'Auth failed');
    }
  }

  return (
    <form className="bg-ayurGreen p-6 rounded shadow-md flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">{mode === 'register' ? 'Register' : 'Login'}</h2>
      <input className="p-2 rounded text-black" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input className="p-2 rounded text-black" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {mode === 'register' && (
        <select className="p-2 rounded text-black" value={role} onChange={e => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="processor">Processor</option>
          <option value="lab">Lab Technician</option>
          <option value="consumer">Consumer</option>
        </select>
      )}
      {error && <div className="text-red-300">{error}</div>}
      <button className="bg-ayurSaffron text-white font-bold py-2 px-4 rounded" type="submit">
        {mode === 'register' ? 'Register' : 'Login'}
      </button>
    </form>
  );
}
