"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { type ResumeData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

export function EducationForm() {
  const { control } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Education</h2>
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
                <span className="sr-only">Remove Education</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name={`education.${index}.college`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College/University</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., University of California" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Degree & Major</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., B.S. in Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={control}
                  name={`education.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name={`education.${index}.gpa`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPA (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3.8/4.0" {...field} />
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
        onClick={() => append({ college: "", degree: "", year: "", gpa: "" })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}
