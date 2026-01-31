"use server";

import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, Timestamp, orderBy, query } from "firebase/firestore";
import type { ResumeData, ContactSchema as ContactDataType } from "@/lib/schemas";
import { z } from "zod";

export type ResumeRequest = {
    id: string;
    resumeData: ResumeData;
    createdAt: Timestamp;
    status: 'new' | 'contacted';
};

const ContactMessageSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    message: z.string(),
    fileUrl: z.string().optional(),
    createdAt: z.instanceof(Timestamp),
});

export type ContactMessage = z.infer<typeof ContactMessageSchema>;

export async function getResumeRequests(): Promise<ResumeRequest[]> {
    try {
        const resumeRequestsRef = collection(db, "resumeRequests");
        const q = query(resumeRequestsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const requests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as ResumeRequest));
        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.error("Error fetching resume requests: ", error);
        return [];
    }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
     try {
        const contactMessagesRef = collection(db, "contactMessages");
        const q = query(contactMessagesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as ContactMessage));
        return JSON.parse(JSON.stringify(messages));
    } catch (error) {
        console.error("Error fetching contact messages: ", error);
        return [];
    }
}

export async function updateResumeStatus(id: string, status: 'new' | 'contacted'): Promise<boolean> {
    try {
        const resumeDocRef = doc(db, "resumeRequests", id);
        await updateDoc(resumeDocRef, { status });
        return true;
    } catch (error) {
        console.error("Error updating resume status: ", error);
        return false;
    }
}
