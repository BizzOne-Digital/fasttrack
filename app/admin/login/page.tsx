'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Login failed');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', padding: 24 }}>
      <form onSubmit={submit} style={{ background: '#fff', padding: 40, width: '100%', maxWidth: 400 }}>
        <h1 className="font-display" style={{ fontSize: 28, color: '#111', marginBottom: 4 }}>Admin Login</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Fast Track Rack content management</p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 6 }}>Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 6 }}>Password</label>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }} />
        </div>

        {error && <p style={{ color: '#DC2626', fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <button type="submit" disabled={loading} className="btn-red" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
