"use server";

import { LoginSchema } from "@/lib/schemas";
import { z } from "zod";

export async function signInWithEmail(credentials: z.infer<typeof LoginSchema>) {
  try {
    const validatedCredentials = LoginSchema.safeParse(credentials);
    if (!validatedCredentials.success) {
      return { error: "Invalid credentials." };
    }
    const { email, password } = validatedCredentials.data;
    // Firebase auth is client-side, this is a conceptual server action.
    // In a real app with server-side auth, this would be different.
    // We are returning a success to be handled by the client.
    // The actual sign in will be handled on the client using the Firebase SDK.
    // This is a limitation of using Firebase client SDK with Next.js server actions.
    // A better approach for production would involve session cookies.
    // For this project, we'll call the client SDK from the form component.
    // This function acts as a pass-through and validator.
    return { success: true };
  } catch (error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return { error: "Invalid email or password." };
      default:
        return { error: "An unexpected error occurred. Please try again." };
    }
  }
}

export async function signOutUser() {
  try {
    // Similarly, sign-out is a client-side SDK operation.
    // This server action exists to be called from the UI.
    return { success: true };
  } catch (error) {
    return { error: "Failed to sign out." };
  }
}
