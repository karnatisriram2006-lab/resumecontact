import { LoginForm } from '@/components/admin/login-form';
import { FileText } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-6 font-headline text-3xl font-bold tracking-tight">
            Admin Login
          </h1>
          <p className="mt-2 text-muted-foreground">
            Access your dashboard to manage submissions.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
