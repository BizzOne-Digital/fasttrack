'use client';
import Link from 'next/link';

interface HeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  bgImg: string;
  profileImg: string;
  profileName: string;
  profileRole: string;
}

export default function Hero({ eyebrow, titleLine1, titleLine2, titleLine3, subtitle, bgImg, profileImg, profileName, profileRole }: HeroProps) {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#0a0a0a', overflow: 'hidden' }}>

      {/* BG image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={bgImg}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
      </div>

      {/* Red left stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: '#DC2626', zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }} className="hero-row">
        <div style={{ maxWidth: 680 }}>

          {/* eyebrow */}
          <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 48, height: 2, background: '#DC2626' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DC2626' }}>
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display anim-fade-up anim-fade-up-d1"
            style={{ fontSize: 'clamp(64px, 10vw, 120px)', lineHeight: 0.92, color: '#fff', marginBottom: 28 }}>
            {titleLine1}<br />
            <span style={{ color: '#DC2626' }}>{titleLine2}</span><br />
            {titleLine3}
          </h1>

          {/* Sub */}
          <p className="anim-fade-up anim-fade-up-d2"
            style={{ fontSize: 18, color: '#d1d5db', lineHeight: 1.7, maxWidth: 520, marginBottom: 40, fontWeight: 300 }}>
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="anim-fade-up anim-fade-up-d3"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 56 }}>
            <Link href="/services" className="btn-red">
              Explore Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link href="/contact" className="btn-outline-red" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div className="anim-fade-up anim-fade-up-d4"
            style={{ display: 'flex', gap: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
            {[['500+', 'Clients Served'], ['15+', 'Years Experience'], ['100%', 'Custom Builds']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 40, color: '#DC2626', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured profile */}
        <div className="hero-profile anim-fade-up anim-fade-up-d2" style={{ flexShrink: 0, width: 280 }}>
          <div style={{ overflow: 'hidden', height: 340, border: '2px solid rgba(255,255,255,0.15)' }}>
            <img src={profileImg} alt={profileName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ background: '#DC2626', padding: '14px 18px' }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>{profileName}</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4 }}>{profileRole}</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 3, color: 'rgba(255,255,255,0.3)', animation: 'bounce 2s infinite' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @media (max-width: 960px) { .hero-profile { display: none !important; } .hero-row { justify-content: flex-start !important; } }
      `}</style>
    </section>
  );
}
