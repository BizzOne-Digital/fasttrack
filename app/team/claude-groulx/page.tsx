'use client';
import { useState } from 'react';
import PageHero from '../../components/PageHero';
import Link from 'next/link';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', border: '1px solid #d1d5db', fontSize: 15, color: '#111', background: '#fff',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 8,
};

function AssessmentForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', level: 'Beginner', goals: '', injuries: '' });
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
          subject: 'Personal Training Assessment — Claude Groulx',
          message: `Fitness Level: ${form.level}\nGoals: ${form.goals}\nInjuries/Limitations: ${form.injuries || 'None reported'}`,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 24px', background: '#fff', border: '1px solid #e5e7eb' }}>
        <h3 className="font-display" style={{ fontSize: 24, color: '#111', marginBottom: 8 }}>Assessment Received</h3>
        <p style={{ color: '#6b7280', fontSize: 15 }}>Claude will review your info and reach out to schedule your session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20, background: '#fff', padding: 32, border: '1px solid #e5e7eb' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="assess-row">
        <div>
          <label style={labelStyle}>Full Name</label>
          <input required style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input required type="email" style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="assess-row">
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Current Fitness Level</label>
          <select style={inputStyle} value={form.level} onChange={e => update('level', e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Competitive Athlete</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Training Goals</label>
        <textarea required rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.goals} onChange={e => update('goals', e.target.value)} placeholder="e.g. build muscle, lose fat, competition prep, general strength..." />
      </div>
      <div>
        <label style={labelStyle}>Injuries or Physical Limitations</label>
        <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.injuries} onChange={e => update('injuries', e.target.value)} placeholder="Optional" />
      </div>
      <button type="submit" disabled={status === 'sending'} className="btn-red" style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>
        {status === 'sending' ? 'Submitting...' : 'Submit Assessment'}
      </button>
      {status === 'error' && <p style={{ color: '#DC2626', fontSize: 14 }}>Something went wrong — please try again.</p>}
    </form>
  );
}

const stats = [
  ['Full Name', 'Claude Groulx'],
  ['Weight', '235–245 lbs (106.6–111.1 kg)'],
  ['Height', '5\'7" (170 cm)'],
  ['Nationality', 'Canadian'],
  ['Profession', 'Professional Bodybuilder'],
  ['Era', '1990s–2000s'],
];

const accomplishments = [
  { year: '2003', title: 'Masters Olympia', place: '1st' },
  { year: '2001', title: 'New Zealand Grand Prix', place: '3rd' },
  { year: '2003', title: 'Rome Grand Prix', place: '4th' },
  { year: '2000', title: 'Canada Pro Cup', place: '4th' },
  { year: '1999', title: 'Toronto Pro Cup', place: '4th' },
  { year: '1997', title: 'Canada Pro Cup', place: '4th' },
  { year: '2002', title: 'Amsterdam Grand Prix', place: '5th' },
  { year: '2002', title: 'British Grand Prix', place: '5th' },
  { year: '2001', title: 'Hungarian Grand Prix', place: '5th' },
  { year: '1998', title: 'Canada Pro Cup', place: '5th' },
  { year: '1997', title: 'Night of Champions', place: '6th' },
];

const gallery = ['/claude1.jpg', '/claude2.jpg', '/claude3.jpg', '/claude4.jpg', '/claude5.jpg'];

export default function ClaudeGroulxPage() {
  return (
    <>
      <PageHero title="CLAUDE" highlight="GROULX"
        subtitle="Professional Bodybuilder — 2003 Masters Olympia Champion"
        breadcrumb="Claude Groulx" bg="/claude4.jpg" />

      {/* Intro */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="cg-row">
          <div>
            <div style={{ overflow: 'hidden', height: 520 }}>
              <img src="/claude2.jpg" alt="Claude Groulx" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
            </div>
          </div>
          <div>
            <div className="section-label"><span>Professional Bodybuilder</span></div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px,5vw,60px)', color: '#111', lineHeight: 1, marginBottom: 20 }}>Claude Groulx</h2>
            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 16 }}>
              Claude Groulx is an ex-professional bodybuilder from Montreal, Canada, best known for his victory at the 2003 Masters Olympia and a 3rd-place finish at the 2001 New Zealand Grand Prix.
            </p>
            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 32 }}>
              He began bodybuilding at 20, training with a friend to pass the time. That casual start became a 12-year competitive career spanning more than 40 shows — 38 of them professional — culminating in his signature win at the 2003 Masters Olympia.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, paddingTop: 24, borderTop: '1px solid #e5e7eb', marginBottom: 28 }}>
              {[['40+', 'Pro Competitions'], ['2003', 'Masters Olympia'], ['12', 'Years Competing']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display" style={{ fontSize: 32, color: '#DC2626', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, paddingTop: 24, borderTop: '1px solid #e5e7eb' }}>
              <a href="mailto:Claudegroulxifbbpro@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#111', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
                Claudegroulxifbbpro@gmail.com
              </a>
              <a href="tel:19547404387" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#111', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                (954) 740-4387
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete Statistics */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span>By The Numbers</span></div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#111', lineHeight: 1 }}>
              ATHLETE <span style={{ color: '#DC2626' }}>STATISTICS</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, maxWidth: 960, margin: '0 auto' }} className="cg-stats-grid">
            {stats.map(([label, val]) => (
              <div key={label} style={{ background: '#fff', padding: '24px 20px', borderTop: '3px solid #DC2626' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DC2626', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 16, color: '#111', fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accomplishments */}
      <section style={{ padding: '96px 0', background: '#111' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span style={{ color: '#DC2626' }}>Competition Record</span></div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#fff', lineHeight: 1 }}>
              KEY <span style={{ color: '#DC2626' }}>ACCOMPLISHMENTS</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {accomplishments.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 13, color: '#6b7280', width: 48, flexShrink: 0 }}>{a.year}</span>
                <span style={{ fontSize: 15, color: '#fff', flex: 1 }}>{a.title}</span>
                <span className="font-display" style={{ fontSize: 20, color: '#DC2626', flexShrink: 0 }}>{a.place}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biography */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          <div className="section-label"><span>His Story</span></div>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#111', lineHeight: 1, marginBottom: 40 }}>
            BIOGRAPHY
          </h2>

          <h3 className="font-display" style={{ fontSize: 24, color: '#111', marginBottom: 12 }}>Bodybuilding Beginnings</h3>
          <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 28 }}>
            Claude grew up in Verdun, Montreal, and first picked up weights at 20, training in the gym with a friend just for fun. After two years of consistent training, his physique had improved enough that his gym owner asked if he'd ever considered competing. He entered his first show, Mr. Montreal, soon after finishing college — and placed 2nd.
          </p>

          <h3 className="font-display" style={{ fontSize: 24, color: '#111', marginBottom: 12 }}>Earning His Pro Card</h3>
          <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 28 }}>
            Determined to win, Claude returned to Mr. Montreal the following year and took the title. Over the next three years he won every amateur show he entered — the Quebec States, the Eastern Canada Championships, and the 1992 Canadian Championships Overall. He took 1993 off to refine his conditioning, then came back in 1994 at 202 lbs to win the Canadian Championships and earn his professional card.
          </p>

          <h3 className="font-display" style={{ fontSize: 24, color: '#111', marginBottom: 12 }}>Life as a Pro</h3>
          <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 28 }}>
            Claude made his professional debut at the 1995 Night of Champions, placing 11th. Over the following nine years he competed in 37 professional shows, with his defining moment coming at the 2003 Masters Olympia — a win at age 40. He retired from competition in 2004 after the GNC Show of Strength Pro.
          </p>

          <h3 className="font-display" style={{ fontSize: 24, color: '#111', marginBottom: 12 }}>Overcoming Adversity</h3>
          <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 0 }}>
            Three weeks before the 2002 Mr. Olympia, Claude suffered a sciatic nerve injury that put him in the hospital, costing him conditioning and a 16th-place finish. Rather than let the setback end his career, he came back a year later in his best shape yet — winning the 2003 Masters Olympia.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span>On Stage & In The Gym</span></div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px,5vw,56px)', color: '#111', lineHeight: 1 }}>
              COMPETITION <span style={{ color: '#DC2626' }}>PHOTOS</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4 }} className="cg-gallery">
            {gallery.map((src, i) => (
              <div key={i} style={{ height: 320, overflow: 'hidden' }}>
                <img src={src} alt={`Claude Groulx ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Nutrition */}
      <section style={{ padding: '96px 0', background: '#111' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="cg-tn">
          <div>
            <div className="section-label"><span style={{ color: '#DC2626' }}>Approach</span></div>
            <h3 className="font-display" style={{ fontSize: 32, color: '#fff', marginBottom: 20 }}>Training</h3>
            <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
              In the off-season Claude trained on a regular four-day split. Preparing for a show, he trained twice a day — one muscle group in the morning, another in the evening, with cardio worked in during the final four weeks of prep.
            </p>
            <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.8 }}>
              His idols were Arnold Schwarzenegger early on, and later Lee Haney and Dorian Yates — whose back development he considered "outstanding."
            </p>
          </div>
          <div>
            <div className="section-label"><span style={{ color: '#DC2626' }}>Approach</span></div>
            <h3 className="font-display" style={{ fontSize: 32, color: '#fff', marginBottom: 20 }}>Nutrition</h3>
            <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
              Claude kept his diet clean year-round — lean proteins like fish, chicken, and ground turkey, with rice, vegetables, and fruit as his primary carbohydrate sources. Bread, potatoes, and pasta stayed off the plate.
            </p>
            <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.8 }}>
              Cheat meals were reserved strictly for the off-season, with high-intensity cardio brought in when he needed to drop fat quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section style={{ padding: '96px 0', background: '#f9fafb' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span>Train With Claude</span></div>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px,5vw,52px)', color: '#111', lineHeight: 1 }}>
              PERSONAL TRAINING <span style={{ color: '#DC2626' }}>ASSESSMENT</span>
            </h2>
            <p style={{ color: '#6b7280', marginTop: 16, fontSize: 15 }}>Tell Claude about your goals and experience so he can build a program around you.</p>
          </div>
          <AssessmentForm />
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 className="font-display" style={{ color: '#111', fontSize: 'clamp(36px,5vw,60px)', marginBottom: 12 }}>
            MEET THE FULL <span style={{ color: '#DC2626' }}>TEAM</span>
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 16 }}>See who else is behind Fast Track Rack.</p>
          <Link href="/team" className="btn-red">Back to Team</Link>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.cg-row{grid-template-columns:1fr!important;gap:40px!important}.cg-tn{grid-template-columns:1fr!important;gap:40px!important}.cg-stats-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:768px){.cg-gallery{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.cg-stats-grid{grid-template-columns:1fr!important}.cg-gallery{grid-template-columns:1fr!important}.assess-row{grid-template-columns:1fr!important}}
      `}</style>
    </>
  );
}
