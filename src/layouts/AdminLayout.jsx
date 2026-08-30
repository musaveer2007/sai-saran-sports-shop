import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut } from 'lucide-react';

export function AdminLayout() {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', color: 'var(--cream)', fontFamily: 'var(--dm)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Simple Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', background: 'var(--ink2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '48px', boxShadow: 'var(--sh-md)' }}>
          <h1 style={{ fontSize: '24px', fontFamily: 'var(--play)', fontWeight: '600', margin: 0, color: '#fff' }}>
            Sai Saran Admin
          </h1>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
