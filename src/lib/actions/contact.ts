"use server";

import { z } from "zod";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ContactSchema } from "@/lib/schemas";

// Modified schema for server-side use with FormData
const FormDataContactSchema = ContactSchema.omit({ fileUrl: true });

export async function submitContactAction(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    const validatedFields = FormDataContactSchema.safeParse({ name, email, message });

    if (!validatedFields.success) {
      return { error: "Invalid form data. Please check your entries." };
    }
    
    let fileUrl: string | undefined = undefined;

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return { error: "File is too large. Maximum size is 5MB." };
      }

      const storageRef = ref(storage, `contact-attachments/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }
    
    const contactMessage = {
      ...validatedFields.data,
      ...(fileUrl && { fileUrl }),
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "contactMessages"), contactMessage);
    
    return { success: true, id: docRef.id };

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
