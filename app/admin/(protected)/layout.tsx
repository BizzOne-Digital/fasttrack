import { redirect } from 'next/navigation';
import { getAdminSession } from '../../../lib/auth';
import AdminNav from './AdminNav';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex' }}>
      <AdminNav email={session.email} />
      <div style={{ flex: 1, padding: '32px 40px' }}>{children}</div>
    </div>
  );
}
