"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeRequestsTable } from "./resume-requests-table";
import { ContactMessagesTable } from "./contact-messages-table";
import type { ContactMessage, ResumeRequest } from "@/lib/actions/admin";
import { FileText, Mail } from "lucide-react";

type Props = {
  initialResumeRequests: ResumeRequest[];
  initialContactMessages: ContactMessage[];
};

export function AdminDashboard({ initialResumeRequests, initialContactMessages }: Props) {
  const [resumeRequests, setResumeRequests] = useState(initialResumeRequests);
  const [contactMessages, setContactMessages] = useState(initialContactMessages);

  return (
    <Tabs defaultValue="resumes" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="resumes">
          <FileText className="mr-2 h-4 w-4" />
          Resume Requests ({resumeRequests.length})
        </TabsTrigger>
        <TabsTrigger value="messages">
          <Mail className="mr-2 h-4 w-4" />
          Contact Messages ({contactMessages.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resumes" className="mt-6">
        <ResumeRequestsTable requests={resumeRequests} setRequests={setResumeRequests} />
      </TabsContent>
      <TabsContent value="messages" className="mt-6">
        <ContactMessagesTable messages={contactMessages} setMessages={setContactMessages} />
      </TabsContent>
    </Tabs>
  );
}
