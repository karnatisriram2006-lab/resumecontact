"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ResumeSuccessPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="mt-4 text-3xl font-bold font-headline">Submission Successful!</CardTitle>
          <CardDescription className="text-lg">Thank you for building your resume with us.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            I have received your details and will be in touch with you shortly.
          </p>
          {id && (
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-sm text-muted-foreground">Your Submission ID is:</p>
              <p className="font-mono text-lg font-semibold">{id}</p>
            </div>
          )}
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
