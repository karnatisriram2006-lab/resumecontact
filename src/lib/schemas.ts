import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

export const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
  fileUrl: z.string().url().optional(),
});

const EducationSchema = z.object({
  college: z.string().min(2, "College name is required"),
  degree: z.string().min(2, "Degree is required"),
  year: z.string().min(4, "Year is required"),
  gpa: z.string().optional(),
});

const ExperienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  startDate: z.string().min(4, "Start date is required"),
  endDate: z.string(),
  description: z.string().min(10, "Description is required"),
});

const ProjectSchema = z.object({
  title: z.string().min(2, "Project title is required"),
  techStack: z.string().min(2, "Tech stack is required"),
  description: z.string().min(10, "Description is required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});


export const ResumeSchema = z.object({
  personalDetails: z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    address: z.string().min(5, "Address is required"),
    linkedin: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    github: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  }),
  education: z.array(EducationSchema),
  skills: z.array(z.object({ id: z.string(), text: z.string() })),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
