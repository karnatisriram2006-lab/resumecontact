import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    step: 1,
    title: "Fill Out the Form",
    description: "Enter your personal details, education, skills, and experience in our guided form.",
  },
  {
    step: 2,
    title: "Preview & Enhance",
    description: "See a live preview of your resume as you type. Use our AI tool to improve your content.",
  },
  {
    step: 3,
    title: "Submit & Download",
    description: "Submit your resume to get in touch with me and download a PDF copy for your records.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Create your perfect resume in just three simple steps.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                 <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-border -translate-x-1/2 hidden md:block"></div>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background z-10">
                  {step.step}
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
