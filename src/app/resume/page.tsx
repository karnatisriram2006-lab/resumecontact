import { MultiStepFormProvider } from "@/contexts/multi-step-form-context";
import { ResumeBuilder } from "@/components/resume/resume-builder";

export default function ResumePage() {
  return (
    <MultiStepFormProvider>
      <ResumeBuilder />
    </MultiStepFormProvider>
  );
}
