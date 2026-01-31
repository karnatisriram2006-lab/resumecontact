"use client";

import { useWatch, useFormContext } from "react-hook-form";
import { type ResumeData } from "@/lib/schemas";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, MapPin, Phone, Link as LinkIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ResumePreview() {
  const { control } = useFormContext<ResumeData>();
  const data = useWatch({ control });

  const { personalDetails, education, skills, experience, projects } = data;
  
  const hasContent = personalDetails?.fullName || personalDetails?.email;

  if (!hasContent) {
    return (
      <div className="h-[80vh] rounded-lg border bg-card p-8 shadow-md">
        <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Separator/>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Separator/>
            <Skeleton className="h-6 w-1/4 mb-4" />
             <div className="space-y-4">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        </div>
      </div>
    );
  }


  return (
    <ScrollArea className="h-[80vh] rounded-lg border bg-card p-2 shadow-md">
      <div className="p-6 text-sm">
        <div className="space-y-8">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-bold font-headline text-primary">
              {personalDetails.fullName || "Full Name"}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {personalDetails.email && <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{personalDetails.email}</div>}
              {personalDetails.phone && <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{personalDetails.phone}</div>}
              {personalDetails.address && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{personalDetails.address}</div>}
              {personalDetails.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="h-3 w-3" /><a href={personalDetails.linkedin} className="text-primary hover:underline">LinkedIn</a></div>}
              {personalDetails.github && <div className="flex items-center gap-1.5"><Github className="h-3 w-3" /><a href={personalDetails.github} className="text-primary hover:underline">GitHub</a></div>}
            </div>
          </header>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold font-headline text-primary border-b pb-1">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary">{skill.text}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold font-headline text-primary border-b pb-1">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold">{exp.company || "Company"}</h3>
                      <p className="text-xs text-muted-foreground">{exp.startDate || "Start Date"} - {exp.endDate || "Present"}</p>
                    </div>
                    <p className="italic text-muted-foreground">{exp.role || "Role"}</p>
                    <p className="mt-1 whitespace-pre-wrap">{exp.description || "Description"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold font-headline text-primary border-b pb-1">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold">{proj.title || "Project Title"}</h3>
                      {proj.link && <a href={proj.link} className="text-primary hover:underline flex items-center gap-1 text-xs"><LinkIcon className="h-3 w-3"/>Link</a>}
                    </div>
                    <p className="italic text-muted-foreground">{proj.techStack || "Tech Stack"}</p>
                    <p className="mt-1 whitespace-pre-wrap">{proj.description || "Description"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold font-headline text-primary border-b pb-1">Education</h2>
              <div className="space-y-2">
                {education.map((edu, index) => (
                  <div key={index}>
                     <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold">{edu.college || "College"}</h3>
                      <p className="text-xs text-muted-foreground">{edu.year || "Year"}</p>
                    </div>
                    <p className="italic text-muted-foreground">{edu.degree || "Degree"}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
