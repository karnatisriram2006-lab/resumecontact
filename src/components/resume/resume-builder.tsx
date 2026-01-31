"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ResumeSchema } from "@/lib/schemas";
import { useMultiStepForm } from "@/contexts/multi-step-form-context";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { FormStepper } from "@/components/resume/form-stepper";
import { ResumePreview } from "@/components/resume/resume-preview";
import { FormNavigation } from "@/components/resume/form-navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export function ResumeBuilder() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentStep, steps } = useMultiStepForm();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const firestore = useFirestore();

  const { handleSubmit } = useFormContext<z.infer<typeof ResumeSchema>>();

  const onSubmit = (data: z.infer<typeof ResumeSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        const validatedData = ResumeSchema.parse(data);

        const docRef = await addDoc(collection(firestore, "resumeRequests"), {
          resumeData: validatedData,
          status: 'new',
          createdAt: serverTimestamp(),
        });

        router.push(`/resume/success?id=${docRef.id}`);

      } catch (e: any) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: errorMessage,
        });
      }
    });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="container mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 gap-12 px-4 py-8 lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <FormStepper />
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-full overflow-y-auto p-4 sm:max-w-lg">
                  <SheetHeader>
                      <SheetTitle>Resume Preview</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                      <ResumePreview scrollAreaClassName="h-auto max-h-[90vh] border-none shadow-none p-0" />
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-grow flex-col">
          <div className="flex-grow">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <CurrentStepComponent />
          </div>
          <FormNavigation isPending={isPending} />
        </form>
      </div>
      <div className="relative hidden lg:block">
        <div className="sticky top-24">
          <h2 className="mb-4 text-2xl font-bold font-headline">Live Preview</h2>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
