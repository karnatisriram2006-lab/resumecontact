"use client";

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
  return (
    <Tabs defaultValue="resumes" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="resumes">
          <FileText className="mr-2 h-4 w-4" />
          Resume Requests ({initialResumeRequests.length})
        </TabsTrigger>
        <TabsTrigger value="messages">
          <Mail className="mr-2 h-4 w-4" />
          Contact Messages ({initialContactMessages.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resumes" className="mt-6">
        <ResumeRequestsTable requests={initialResumeRequests} />
      </TabsContent>
      <TabsContent value="messages" className="mt-6">
        <ContactMessagesTable messages={initialContactMessages} />
      </TabsContent>
    </Tabs>
  );
}
