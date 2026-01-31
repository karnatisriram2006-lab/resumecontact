import { AdminDashboard } from '@/components/admin/dashboard';

export default function AdminPage() {
  // Data will now be fetched on the client in the AdminDashboard component
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 font-headline text-4xl font-bold">Admin Dashboard</h1>
      <AdminDashboard 
        initialResumeRequests={[]}
        initialContactMessages={[]}
      />
    </div>
  );
}
