import type { ResumeData } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

type Props = {
  resume: ResumeData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ResumeDetailView({ resume, isOpen, onOpenChange }: Props) {
  const { personalDetails, education, skills, experience, projects } = resume;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-headline">{personalDetails.fullName}</DialogTitle>
          <DialogDescription>
            Resume Details
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
          <div className="space-y-8 p-1">
            {/* Personal Details */}
            <section>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact Information</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /> <a href={`mailto:${personalDetails.email}`} className="hover:underline">{personalDetails.email}</a></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /> <span>{personalDetails.phone}</span></div>
                <div className="flex items-center gap-3 col-span-full"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{personalDetails.address}</span></div>
                {personalDetails.linkedin && <div className="flex items-center gap-3"><Linkedin className="h-4 w-4 text-muted-foreground" /> <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></div>}
                {personalDetails.github && <div className="flex items-center gap-3"><Github className="h-4 w-4 text-muted-foreground" /> <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></div>}
              </div>
            </section>
            
            <Separator />

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => <Badge key={skill.id} variant="secondary">{skill.text}</Badge>)}
                </div>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Experience</h3>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-semibold">{exp.role}</h4>
                        <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Projects */}
            {projects.length > 0 && (
               <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Projects</h3>
                <div className="space-y-6">
                  {projects.map((proj, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-semibold">{proj.title}</h4>
                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View Project</a>}
                      </div>
                      <p className="text-sm text-muted-foreground">{proj.techStack}</p>
                      <p className="mt-2 text-sm">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Education</h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-semibold">{edu.college}</h4>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.degree}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
