"use client";

import { useFormContext } from "react-hook-form";
import { type ResumeData } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function PersonalDetailsForm() {
  const { control } = useFormContext<ResumeData>();

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Personal Details</h2>
        <FormField
            control={control}
            name="personalDetails.fullName"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={control}
                name="personalDetails.email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                    <Input type="email" placeholder="e.g., john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={control}
                name="personalDetails.phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., (123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
            control={control}
            name="personalDetails.address"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                <Input placeholder="e.g., City, State, Country" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={control}
                name="personalDetails.linkedin"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                    <FormControl>
                    <Input placeholder="https://linkedin.com/in/..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={control}
                name="personalDetails.github"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>GitHub Profile (Optional)</FormLabel>
                    <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
    </div>
  );
}
