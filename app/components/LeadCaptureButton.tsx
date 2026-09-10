'use client';
import { useState } from 'react';

export default function LeadCaptureButton() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: 'Website Lead — Click to Connect',
          message: 'Visitor requested a callback via the site-wide contact button.',
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const close = () => {
    setOpen(false);
    setStatus('idle');
    setForm({ name: '', email: '', phone: '' });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 90,
          background: '#DC2626', color: '#fff', border: 'none', cursor: 'pointer',
          padding: '16px 26px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(220,38,38,0.4)', display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Get a Callback
      </button>

      {open && (
        <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', maxWidth: 420, width: '100%', padding: 36, position: 'relative' }}>
            <button onClick={close} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 className="font-display" style={{ fontSize: 24, color: '#111', marginBottom: 8 }}>Thanks!</h3>
                <p style={{ color: '#6b7280', fontSize: 15 }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display" style={{ fontSize: 26, color: '#111', marginBottom: 6 }}>Get a Callback</h3>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>Leave your details and we'll reach out to you.</p>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input required placeholder="Name" style={{ padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                    value={form.name} onChange={e => update('name', e.target.value)} />
                  <input required type="email" placeholder="Email" style={{ padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                    value={form.email} onChange={e => update('email', e.target.value)} />
                  <input placeholder="Phone" style={{ padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                    value={form.phone} onChange={e => update('phone', e.target.value)} />
                  <button type="submit" disabled={status === 'sending'} className="btn-red" style={{ border: 'none', cursor: 'pointer', marginTop: 6 }}>
                    {status === 'sending' ? 'Sending...' : 'Request Callback'}
                  </button>
                  {status === 'error' && <p style={{ color: '#DC2626', fontSize: 13 }}>Something went wrong — please try again.</p>}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
