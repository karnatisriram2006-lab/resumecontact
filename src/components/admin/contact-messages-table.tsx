"use client";

import { useState } from 'react';
import type { ContactMessage } from '@/lib/actions/admin';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Trash2 } from 'lucide-react';
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
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

type Props = {
  messages: ContactMessage[];
};

export function ContactMessagesTable({ messages: initialMessages }: Props) {
  const [messages, setMessages] = useState(initialMessages);

  const handleDelete = (id: string) => {
    // Here you would call a server action to delete the message from Firestore
    console.log(`Deleting message ${id}`);
    setMessages(messages.filter(msg => msg.id !== id));
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
                {format(message.createdAt.toDate(), "PPpp")}
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
                        This action cannot be undone. This will permanently delete this message.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(message.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
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
