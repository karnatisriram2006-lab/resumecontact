"use client";

import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useStorage } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { type ContactMessage } from '@/components/admin/dashboard';

type Props = {
  messages: ContactMessage[];
};

export function ContactMessagesTable({ messages }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();

  const handleDelete = (id: string, fileUrl?: string) => {
    startTransition(async () => {
      try {
        // If there's a file URL, delete the file from Storage
        if (fileUrl) {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
        }
        // Delete the document from Firestore
        const messageDocRef = doc(firestore, "contactMessages", id);
        await deleteDoc(messageDocRef);
        
        toast({
          title: 'Message Deleted',
          description: 'The message has been successfully deleted.',
        });
      } catch (error) {
        console.error("Error deleting message:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete the message. Please try again.',
        });
      }
    });
  };

  if (messages.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">No contact messages found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Received</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Attachment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell className="w-40 whitespace-nowrap">
                {message.createdAt ? format(new Date(message.createdAt.seconds * 1000), "PPpp") : 'N/A'}
              </TableCell>
              <TableCell className="font-medium">{message.name}</TableCell>
              <TableCell>
                <a href={`mailto:${message.email}`} className="flex items-center gap-2 hover:underline">
                  {message.email}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
              <TableCell className="max-w-xs truncate">{message.message}</TableCell>
              <TableCell>
                {message.fileUrl ? (
                  <Button variant="outline" size="sm" asChild>
                    <a href={message.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </a>
                  </Button>
                ) : (
                  <Badge variant="secondary">None</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this message and its attachment.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(message.id, message.fileUrl)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isPending}
                      >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
