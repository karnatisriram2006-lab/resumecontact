"use client";

import { useMemo } from "react";
import { collection, query, orderBy, Timestamp } from "firebase/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeRequestsTable } from "./resume-requests-table";
import { ContactMessagesTable } from "./contact-messages-table";
import { Mail } from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { type ResumeData } from "@/lib/schemas";
import { Logo } from "../logo";

// Types moved here to be accessible by client-side components
export type ResumeRequest = {
    id: string;
    resumeData: ResumeData;
    createdAt: Timestamp;
    status: 'new' | 'contacted';
};

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    fileUrl?: string;
    createdAt: Timestamp;
};


export function AdminDashboard() {
  const firestore = useFirestore();

  // Memoize Firestore queries
  const resumeRequestsQuery = useMemoFirebase(
    () => query(collection(firestore, "resumeRequests"), orderBy("createdAt", "desc")),
    [firestore]
  );
  const contactMessagesQuery = useMemoFirebase(
    () => query(collection(firestore, "contactMessages"), orderBy("createdAt", "desc")),
    [firestore]
  );

  // Use the useCollection hook to fetch data in real-time
  const { data: resumeRequests, isLoading: loadingResumes } = useCollection<ResumeRequest>(resumeRequestsQuery);
  const { data: contactMessages, isLoading: loadingMessages } = useCollection<ContactMessage>(contactMessagesQuery);
  
  const resumeCount = resumeRequests?.length ?? 0;
  const messageCount = contactMessages?.length ?? 0;

  return (
    <Tabs defaultValue="resumes" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="resumes">
          <Logo className="mr-2 h-4 w-4" />
          Resume Requests ({loadingResumes ? '...' : resumeCount})
        </TabsTrigger>
        <TabsTrigger value="messages">
          <Mail className="mr-2 h-4 w-4" />
          Contact Messages ({loadingMessages ? '...' : messageCount})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resumes" className="mt-6">
        <ResumeRequestsTable requests={resumeRequests || []} />
      </TabsContent>
      <TabsContent value="messages" className="mt-6">
        <ContactMessagesTable messages={contactMessages || []} />
      </TabsContent>
    </Tabs>
  );
}
