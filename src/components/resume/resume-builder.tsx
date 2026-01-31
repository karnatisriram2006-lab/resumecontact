"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ResumeSchema } from "@/lib/schemas";
import { useMultiStepForm } from "@/contexts/multi-step-form-context";
import { submitResumeAction } from "@/lib/actions/resume";
import { useToast } from "@/hooks/use-toast";

import { FormStepper } from "@/components/resume/form-stepper";
import { ResumePreview } from "@/components/resume/resume-preview";
import { FormNavigation } from "@/components/resume/form-navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

export function ResumeBuilder() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentStep, steps } = useMultiStepForm();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResumeSchema>>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      personalDetails: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
      },
      education: [],
      skills: [],
      experience: [],
      projects: [],
    },
  });

  const onSubmit = (data: z.infer<typeof ResumeSchema>) => {
    setError(null);
    startTransition(async () => {
      const result = await submitResumeAction(data);
      if (result.error) {
        setError(result.error);
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.error,
        });
      } else {
        router.push(`/resume/success?id=${result.id}`);
      }
    });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...form}>
      <div className="container mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 gap-12 px-4 py-8 lg:grid-cols-2">
        <div className="flex flex-col">
          <FormStepper />
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-grow flex-col">
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
    </FormProvider>
  );
}
