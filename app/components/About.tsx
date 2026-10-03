'use client';
import Link from 'next/link';

interface AboutProps {
  label: string;
  titleLine1: string;
  titleLine2: string;
  para1: string;
  para2: string;
  img: string;
  badgeNumber: string;
  badgeLabel: string;
}

export default function About({ label, titleLine1, titleLine2, para1, para2, img, badgeNumber, badgeLabel }: AboutProps) {
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">

          {/* Image block */}
          <div style={{ position: 'relative' }}>
            <div className="img-zoom" style={{ aspectRatio: '4/5' }}>
              <img src={img} alt="Fitness equipment" />
            </div>
            {/* Floating stat */}
            <div style={{
              position: 'absolute', bottom: -24, right: -24,
              background: '#DC2626', color: '#fff',
              padding: '20px 28px', boxShadow: '0 16px 48px rgba(220,38,38,0.4)'
            }}>
              <div className="font-display" style={{ fontSize: 52, lineHeight: 1 }}>{badgeNumber}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4, opacity: 0.9 }}>{badgeLabel}</div>
            </div>
            {/* Border decoration */}
            <div style={{ position: 'absolute', top: -16, left: -16, right: 16, bottom: -16, border: '2px solid #e5e7eb', zIndex: -1 }} />
          </div>

          {/* Content */}
          <div>
            <div className="section-label"><span>{label}</span></div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#111', lineHeight: 1, marginBottom: 24 }}>
              {titleLine1}<br /><span style={{ color: '#DC2626' }}>{titleLine2}</span>
            </h2>
            <p style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.8, marginBottom: 16 }}>
              {para1}
            </p>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, marginBottom: 36 }}>
              {para2}
            </p>

            {/* Checklist */}
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginBottom: 40 }}>
              {['Commercial-grade steel', 'Custom-built systems', '500+ satisfied clients', 'Full warranty included', 'USA craftsmanship', 'After-sales support'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-red">Learn More About Us</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
