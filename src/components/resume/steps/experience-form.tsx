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

export function ExperienceForm() {
  const { control } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Work Experience</h2>
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
                <span className="sr-only">Remove Experience</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experience.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role / Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={control}
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jan 2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Present or Dec 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                        {...field}
                      />
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
        onClick={() => append({ company: "", role: "", startDate: "", endDate: "", description: "" })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
}
