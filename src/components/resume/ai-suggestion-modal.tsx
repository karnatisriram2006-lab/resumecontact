"use client";

import { useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Bot, Loader2, Sparkles, Clipboard, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { enhanceResumeWording, EnhanceResumeWordingOutput } from "@/ai/flows/enhance-resume-wording-with-ai";
import { type ResumeData } from "@/lib/schemas";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
    </Button>
  );
};

export function AiSuggestionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<EnhanceResumeWordingOutput | null>(null);
  const [originalContent, setOriginalContent] = useState({ jobDescription: "", skills: "", projectDescription: "" });
  const [isPending, startTransition] = useTransition();
  const { getValues } = useFormContext<ResumeData>();

  const handleEnhance = () => {
    startTransition(async () => {
      const values = getValues();
      const jobDescription = values.experience.map(exp => exp.description).join("\n\n---\n\n");
      const skills = values.skills.map(skill => skill.text).join(", ");
      const projectDescription = values.projects.map(proj => proj.description).join("\n\n---\n\n");
      
      setOriginalContent({ jobDescription, skills, projectDescription });

      const result = await enhanceResumeWording({
        jobDescription,
        skills,
        projectDescription
      });

      setSuggestions(result);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleEnhance} variant="outline">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          Enhance with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-accent" />
            AI-Powered Suggestions
          </DialogTitle>
          <DialogDescription>
            Here are some AI-powered suggestions to improve your resume. Copy the parts you like and update your form.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 pr-6">
            
            {/* Skills */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Skills</h3>
              <div>
                <h4 className="font-medium text-muted-foreground mb-2">Original</h4>
                <p className="text-sm p-3 rounded-md bg-secondary min-h-[50px]">{originalContent.skills}</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-primary">AI Suggestion</h4>
                  <CopyButton text={suggestions?.enhancedSkills || ""} />
                </div>
                <p className="text-sm p-3 rounded-md border border-primary/50 bg-primary/5 min-h-[50px]">
                  {suggestions?.enhancedSkills}
                </p>
              </div>
            </div>

            <div className="h-full w-px bg-border hidden md:block self-center"></div>

            {/* Experience */}
            <div className="space-y-4 md:col-span-2">
              <Separator />
              <h3 className="font-semibold text-lg">Experience Description</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Original</h4>
                  <p className="text-sm p-3 rounded-md bg-secondary whitespace-pre-wrap min-h-[100px]">{originalContent.jobDescription}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-primary">AI Suggestion</h4>
                    <CopyButton text={suggestions?.enhancedJobDescription || ""} />
                  </div>
                  <p className="text-sm p-3 rounded-md border border-primary/50 bg-primary/5 whitespace-pre-wrap min-h-[100px]">
                    {suggestions?.enhancedJobDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4 md:col-span-2">
              <Separator />
              <h3 className="font-semibold text-lg">Project Description</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Original</h4>
                  <p className="text-sm p-3 rounded-md bg-secondary whitespace-pre-wrap min-h-[100px]">{originalContent.projectDescription}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-primary">AI Suggestion</h4>
                    <CopyButton text={suggestions?.enhancedProjectDescription || ""} />
                  </div>
                  <p className="text-sm p-3 rounded-md border border-primary/50 bg-primary/5 whitespace-pre-wrap min-h-[100px]">
                    {suggestions?.enhancedProjectDescription}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
