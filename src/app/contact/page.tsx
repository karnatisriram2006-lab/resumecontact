"use client";

import { ContactForm } from '@/components/contact/contact-form';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background py-12">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-headline text-4xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground">
              Have a question or a project in mind? I'd love to hear from you. Fill out the form, and I'll get back to you as soon as possible.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <a href="mailto:contact@resumecontact.pro" className="hover:underline">
                contact@resumecontact.pro
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <a href="tel:+1234567890" className="hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-lg sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
