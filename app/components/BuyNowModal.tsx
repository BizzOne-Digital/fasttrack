'use client';
import { useState } from 'react';

const INTERESTS = [
  'Anti-Aging & Longevity',
  'Body Transformation',
  'Weight Loss',
  'Body Building',
  'Peptide Therapy',
  'Sports Nutrition',
  'All Of The Above',
];

interface Props {
  program: string;
  onClose: () => void;
}

export default function BuyNowModal({ program, onClose }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const toggleInterest = (item: string) => {
    setInterests(prev => {
      if (item === 'All Of The Above') {
        return prev.includes(item) ? [] : [...INTERESTS];
      }
      const next = prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item];
      return next.filter(i => i !== 'All Of The Above');
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          subject: `Shop Order — ${program}`,
          message: `Program: ${program}\nInterested in: ${interests.join(', ') || 'Not specified'}`,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', maxWidth: 480, width: '100%', padding: 36, position: 'relative', margin: '40px 0' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h3 className="font-display" style={{ fontSize: 26, color: '#111', marginBottom: 8 }}>Thank You!</h3>
            <p style={{ color: '#6b7280', fontSize: 15 }}>We've received your order request for the {program}. We'll reach out shortly to complete your purchase.</p>
          </div>
        ) : (
          <>
            <div className="section-label"><span>{program}</span></div>
            <h3 className="font-display" style={{ fontSize: 28, color: '#111', marginBottom: 20 }}>Please Enter</h3>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <input required placeholder="First Name" style={{ flex: 1, padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                  value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input required placeholder="Last Name" style={{ flex: 1, padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                  value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
              <input required type="tel" placeholder="Phone Number" style={{ padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                value={phone} onChange={e => setPhone(e.target.value)} />
              <input required type="email" placeholder="Email Address" style={{ padding: '12px 14px', border: '1px solid #d1d5db', fontSize: 15 }}
                value={email} onChange={e => setEmail(e.target.value)} />

              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10 }}>What are you interested in?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {INTERESTS.map(item => (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#374151', cursor: 'pointer' }}>
                      <input type="checkbox" checked={interests.includes(item)} onChange={() => toggleInterest(item)} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn-red" style={{ border: 'none', cursor: 'pointer', marginTop: 10 }}>
                {status === 'sending' ? 'Submitting...' : 'Shop'}
              </button>
              {status === 'error' && <p style={{ color: '#DC2626', fontSize: 13 }}>Something went wrong — please try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
