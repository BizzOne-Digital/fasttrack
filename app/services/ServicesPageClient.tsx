'use client';
import PageHero from '../components/PageHero';
import Link from 'next/link';
import type { ServiceItem } from '../../lib/pageDefaults';

export default function ServicesPageClient({ services }: { services: ServiceItem[] }) {
  return (
    <>
      <PageHero title="OUR" highlight="SERVICES"
        subtitle="We provide world-class fitness training and equipment. Contact us for pricing tailored to your needs."
        breadcrumb="Services" bg="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80" />

      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {services.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', direction: i % 2 === 1 ? 'rtl' : 'ltr' }} className="service-row">
                <div style={{ overflow: 'hidden', direction: 'ltr', position: 'relative' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
                  {s.logo && (
                    <img src={s.logo} alt={`${s.title} logo`} style={{ position: 'absolute', bottom: 16, right: 16, width: 110, height: 'auto', borderRadius: 6, boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }} />
                  )}
                </div>
                <div style={{ direction: 'ltr' }}>
                  <div className="section-label"><span>{s.tagline}</span></div>
                  <h2 className="font-display" style={{ fontSize: 'clamp(32px,4vw,52px)', color: '#111', lineHeight: 1, marginBottom: 16 }}>{s.title}</h2>
                  <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.8, marginBottom: 28 }}>{s.desc}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                    {s.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-red">Get a Quote</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0', background: '#111' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="font-display" style={{ color: '#fff', fontSize: 36, lineHeight: 1 }}>PRICING IS CONTACT-BASED</div>
            <p style={{ color: '#6b7280', marginTop: 8, fontSize: 15 }}>Every project is unique. Contact us and we'll build a quote around your exact needs.</p>
          </div>
          <Link href="/contact" className="btn-red">Contact for Pricing</Link>
        </div>
      </section>

      <style>{`@media(max-width:900px){.service-row{grid-template-columns:1fr!important;direction:ltr!important;gap:32px!important}}`}</style>
    </>
  );
}
