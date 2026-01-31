"use client";

import { useFormContext } from "react-hook-form";
import { type ResumeData } from "@/lib/schemas";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/ui/tag-input";

export function SkillsForm() {
  const { control } = useFormContext<ResumeData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <p className="text-muted-foreground">
        Add your technical and professional skills. Press Enter or comma to add a new skill.
      </p>
      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Skills</FormLabel>
            <FormControl>
              <TagInput
                {...field}
                placeholder="Enter a skill..."
                tags={field.value}
                setTags={(newTags) => {
                  field.onChange(newTags);
                }}
              />
            </FormControl>
            <FormDescription>
                Showcase your most relevant skills for the jobs you're targeting.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
