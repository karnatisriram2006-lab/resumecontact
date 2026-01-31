"use server";

import { ResumeSchema, type ResumeData } from "@/lib/schemas";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function submitResumeAction(data: ResumeData) {
  try {
    const validatedData = ResumeSchema.parse(data);

    const docRef = await addDoc(collection(db, "resumeRequests"), {
      resumeData: validatedData,
      status: 'new',
      createdAt: serverTimestamp(),
    });

    return { id: docRef.id };
  } catch (error) {
    console.error("Error submitting resume: ", error);
    if (error instanceof Error) {
        return { error: `Submission failed: ${error.message}` };
    }
    return { error: "An unknown error occurred during submission." };
  }
}
