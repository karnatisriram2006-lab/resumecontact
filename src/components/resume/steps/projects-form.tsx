"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { type ResumeData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

export function ProjectsForm() {
  const { control } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Projects</h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="relative">
            <CardHeader>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7 text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove Project</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name={`projects.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My Awesome App" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`projects.${index}.techStack`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React, Next.js, Tailwind CSS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project, its purpose, and your role..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={control}
                name={`projects.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ title: "", techStack: "", description: "", link: "" })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
