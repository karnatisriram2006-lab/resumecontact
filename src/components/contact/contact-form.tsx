"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirestore, useStorage } from "@/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ContactSchema } from "@/lib/schemas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2, UploadCloud, X } from "lucide-react";

type FormData = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  
  const firestore = useFirestore();
  const storage = useStorage();

  const form = useForm<FormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      fileUrl: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError("fileUrl", { message: "File must be less than 5MB." });
        return;
      }
      setFile(selectedFile);
      form.clearErrors("fileUrl");
    }
  };

  const onSubmit = (values: FormData) => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      try {
        let fileUrl: string | undefined = undefined;

        if (file) {
          const storageRef = ref(storage, `contact-attachments/${Date.now()}-${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          fileUrl = await getDownloadURL(snapshot.ref);
        }

        const contactMessage = {
          name: values.name,
          email: values.email,
          message: values.message,
          ...(fileUrl && { fileUrl }),
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(firestore, "contactMessages"), contactMessage);

        setSuccess(true);
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
        setFile(null);
      } catch (e: any) {
        console.error("Error submitting contact form:", e);
        const errorMessage = e.message || "An unexpected error occurred. Please try again later.";
        setError(errorMessage);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: errorMessage,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your message has been sent successfully.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Attach Resume (Optional)</FormLabel>
          <FormControl>
            <div className="relative">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md border border-dashed border-input p-4 flex justify-center items-center gap-2 text-sm text-muted-foreground hover:bg-accent/50 transition-colors">
                <UploadCloud className="h-5 w-5"/>
                <span>{file ? file.name : 'Upload PDF or DOC (Max 5MB)'}</span>
              </label>
              <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </div>
          </FormControl>
          {file && (
            <div className="mt-2 flex items-center justify-between rounded-md bg-secondary p-2 text-sm">
              <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <FormMessage>{form.formState.errors.fileUrl?.message}</FormMessage>
        </FormItem>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
        </Button>
      </form>
    </Form>
  );
}
