import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="relative mx-auto mb-8 h-16 w-16">
          <div className="absolute inset-0 rounded-2xl bg-primary opacity-20 transform rotate-45"></div>
          <div className="absolute inset-2 rounded-2xl bg-accent opacity-30 transform -rotate-45"></div>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Build Your Professional Resume in Minutes
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Create a standout resume with our easy-to-use builder, modern templates, and AI-powered suggestions. Land your dream job faster.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} className="transition-transform hover:scale-105">
            <Link href="/resume">Create Resume</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="transition-transform hover:scale-105">
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
