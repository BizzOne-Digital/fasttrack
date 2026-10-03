import Link from 'next/link';
import { pageConfigs } from '../../../lib/pageConfigs';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 15 }}>Manage the content and images shown on the live website.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {pageConfigs.map(p => (
          <Link key={p.slug} href={`/admin/content/${p.slug}`}
            style={{ background: '#fff', padding: 24, textDecoration: 'none', border: '1px solid #e5e7eb', display: 'block' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#DC2626', marginBottom: 8 }}>
              {p.folder}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{p.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
