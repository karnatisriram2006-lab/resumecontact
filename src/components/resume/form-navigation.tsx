"use client";

import { useMultiStepForm } from "@/contexts/multi-step-form-context";
import { Button } from "@/components/ui/button";
import { AiSuggestionModal } from "./ai-suggestion-modal";
import { Loader2 } from "lucide-react";

type Props = {
  isPending: boolean;
};

export function FormNavigation({ isPending }: Props) {
  const { currentStep, steps, nextStep, prevStep } = useMultiStepForm();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="mt-8 flex justify-between items-center border-t pt-6">
      <div className="flex gap-4">
        {!isFirstStep && (
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
        )}
        {!isLastStep && (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        )}
        {isLastStep && (
          <Button type="submit" disabled={isPending} style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Resume
          </Button>
        )}
      </div>

      <AiSuggestionModal />
    </div>
  );
}
