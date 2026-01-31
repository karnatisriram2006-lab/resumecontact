"use client";

import { useState, useTransition } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Check, Loader2 } from 'lucide-react';
import { ResumeDetailView } from './resume-detail-view';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { type ResumeRequest } from './dashboard';

type Props = {
  requests: ResumeRequest[];
};

export function ResumeRequestsTable({ requests }: Props) {
  const [selectedResume, setSelectedResume] = useState<ResumeRequest | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleMarkAsContacted = (id: string) => {
    startTransition(async () => {
      try {
        const resumeDocRef = doc(firestore, "resumeRequests", id);
        await updateDoc(resumeDocRef, { status: 'contacted' });
        toast({
          title: "Status Updated",
          description: "Resume marked as contacted.",
        });
      } catch(error) {
        console.error("Error updating status:", error);
        toast({
          variant: 'destructive',
          title: "Update Failed",
          description: "Could not update resume status.",
        });
      }
    });
  };

  const statusBadge = (status: 'new' | 'contacted') => {
    return (
      <Badge
        className={cn(
          'capitalize',
          status === 'new' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
          status === 'contacted' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
        )}
      >
        {status}
      </Badge>
    );
  };

  if (requests.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">No resume requests found.</p>;
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Received</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium whitespace-nowrap">
                  {request.createdAt ? formatDistanceToNow(new Date(request.createdAt.seconds * 1000), { addSuffix: true }) : 'N/A'}
                </TableCell>
                <TableCell>{request.resumeData.personalDetails.fullName}</TableCell>
                <TableCell>{request.resumeData.personalDetails.email}</TableCell>
                <TableCell>{statusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedResume(request)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                  {request.status === 'new' && (
                    <Button variant="ghost" size="icon" onClick={() => handleMarkAsContacted(request.id)} disabled={isPending}>
                      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                      <span className="sr-only">Mark as Contacted</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedResume && (
        <ResumeDetailView
          resume={selectedResume.resumeData}
          isOpen={!!selectedResume}
          onOpenChange={(open) => !open && setSelectedResume(null)}
        />
      )}
    </>
  );
}
