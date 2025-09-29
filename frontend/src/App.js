import React, { useState } from 'react';
import DashboardSelector from './components/DashboardSelector';
import FarmerDashboard from './dashboards/FarmerDashboard';
import ProcessorDashboard from './dashboards/ProcessorDashboard';
import LabDashboard from './dashboards/LabDashboard';
import ConsumerDashboard from './dashboards/ConsumerDashboard';
import AuthForm from './components/AuthForm';
import { useAuth } from './hooks/useAuth';

function App() {
  const { token, role, saveAuth, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [selectRole, setSelectRole] = useState(null);

  let dashboard = null;
  if (role === 'farmer') dashboard = <FarmerDashboard />;
  else if (role === 'processor') dashboard = <ProcessorDashboard />;
  else if (role === 'lab') dashboard = <LabDashboard />;
  else if (role === 'consumer') dashboard = <ConsumerDashboard />;

  async function handleAuth({ username, password, role }) {
    const url = `/api/auth/${authMode}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Auth failed');
    saveAuth({ token: data.token, role: data.role });
  }

  return (
    <div className="min-h-screen bg-ayurEarth text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-ayurSaffron mb-4">Building Trust in Ayurvedic Products</h1>
      <p className="text-lg max-w-xl text-center mb-8">
        Transparent, authentic, and sustainable Ayurvedic supply chain. Choose your role to begin.
      </p>
      {!token ? (
        <div className="flex flex-col gap-2 items-center">
          <AuthForm onAuth={handleAuth} mode={authMode} />
          <button className="underline mt-2" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? 'No account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-4 items-center">
            <span className="italic">Logged in as <b>{role}</b></span>
            <button className="underline" onClick={logout}>Logout</button>
          </div>
          {dashboard}
        </>
      )}
    </div>
  );
}

export default App;
