'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { pageConfigs } from '../../../lib/pageConfigs';

export default function AdminNav({ email }: { email: string }) {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <nav style={{ width: 260, background: '#111', color: '#fff', padding: '32px 24px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="font-display" style={{ fontSize: 20, color: '#fff' }}>FAST TRACK</div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Admin Panel</div>
      </div>

      <Link href="/admin" style={{ color: '#9ca3af', fontSize: 13, textDecoration: 'none', marginBottom: 20, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Dashboard
      </Link>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4b5563', marginBottom: 10, marginTop: 10 }}>
        Pages
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 32 }}>
        {pageConfigs.map(p => (
          <Link key={p.slug} href={`/admin/content/${p.slug}`}
            style={{ color: '#d1d5db', fontSize: 13, textDecoration: 'none', padding: '8px 10px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            {p.title}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #1f2937' }}>
        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 12, wordBreak: 'break-all' }}>{email}</div>
        <button onClick={logout} style={{ background: 'none', border: '1px solid #374151', color: '#9ca3af', fontSize: 12, padding: '8px 14px', cursor: 'pointer', width: '100%' }}>
          Log Out
        </button>
      </div>
    </nav>
  );
}
