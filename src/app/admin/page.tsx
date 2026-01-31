import { getContactMessages, getResumeRequests } from '@/lib/actions/admin';
import { AdminDashboard } from '@/components/admin/dashboard';

export default async function AdminPage() {
  const initialResumeRequests = await getResumeRequests();
  const initialContactMessages = await getContactMessages();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 font-headline text-4xl font-bold">Admin Dashboard</h1>
      <AdminDashboard 
        initialResumeRequests={initialResumeRequests}
        initialContactMessages={initialContactMessages}
      />
    </div>
  );
}
