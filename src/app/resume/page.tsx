"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResumeSchema } from "@/lib/schemas";
import { MultiStepFormProvider } from "@/contexts/multi-step-form-context";
import { ResumeBuilder } from "@/components/resume/resume-builder";

export default function ResumePage() {
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

  return (
    <FormProvider {...form}>
      <MultiStepFormProvider>
        <ResumeBuilder />
      </MultiStepFormProvider>
    </FormProvider>
  );
}
