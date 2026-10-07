'use client';
import { useState } from 'react';
import BuyNowModal from './BuyNowModal';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Training Program',
    desc: 'Tailored training program to match your level and goals, built by an IFBB Pro and Master Trainer.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Nutrition Program',
    desc: 'A personalized nutrition plan designed around your body, goals, and lifestyle.',
  },
];

export default function Services() {
  const [buyingProgram, setBuyingProgram] = useState<string | null>(null);

  return (
    <section style={{ padding: '96px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span>What We Offer</span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: '#111', lineHeight: 1, marginBottom: 16 }}>
            OUR <span style={{ color: '#DC2626' }}>SERVICES</span>
          </h2>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 480, margin: '0 auto' }}>
            Personalized training and nutrition programs built around your goals.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, maxWidth: 800, margin: '0 auto' }} className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="card-lift"
              style={{
                background: '#fff',
                padding: '40px 32px',
                borderBottom: '3px solid transparent',
                transition: 'border-color 0.2s, transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = '#DC2626')}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
            >
              <div style={{ color: '#DC2626', marginBottom: 20 }}>{s.icon}</div>
              <h3 className="font-display" style={{ fontSize: 22, color: '#111', marginBottom: 12, letterSpacing: '0.02em' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, marginBottom: 24 }}>{s.desc}</p>
              <button onClick={() => setBuyingProgram(s.title)} className="btn-red" style={{ border: 'none', cursor: 'pointer' }}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {buyingProgram && <BuyNowModal program={buyingProgram} onClose={() => setBuyingProgram(null)} />}
    </section>
  );
}
