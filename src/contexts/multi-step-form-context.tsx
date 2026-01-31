"use client";

import { EducationForm } from "@/components/resume/steps/education-form";
import { ExperienceForm } from "@/components/resume/steps/experience-form";
import { PersonalDetailsForm } from "@/components/resume/steps/personal-details-form";
import { ProjectsForm } from "@/components/resume/steps/projects-form";
import { SkillsForm } from "@/components/resume/steps/skills-form";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type Step = {
  id: string;
  name: string;
  component: () => JSX.Element;
  fields?: string[];
};

const steps: Step[] = [
    { id: 'Step 1', name: 'Personal Details', component: PersonalDetailsForm, fields: ['personalDetails'] },
    { id: 'Step 2', name: 'Education', component: EducationForm, fields: ['education'] },
    { id: 'Step 3', name: 'Skills', component: SkillsForm, fields: ['skills'] },
    { id: 'Step 4', name: 'Experience', component: ExperienceForm, fields: ['experience'] },
    { id: 'Step 5', name: 'Projects', component: ProjectsForm, fields: ['projects'] },
];

type MultiStepFormContextType = {
  steps: Step[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
};

const MultiStepFormContext = createContext<MultiStepFormContextType | undefined>(undefined);

export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { trigger } = useFormContext();

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields as any;
    const isValid = await trigger(currentFields);
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const value = useMemo(() => ({
    steps,
    currentStep,
    nextStep,
    prevStep,
  }), [currentStep]);

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
}

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error("useMultiStepForm must be used within a MultiStepFormProvider");
  }
  return context;
};
