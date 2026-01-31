import { Zap, FileText, Download, Bot } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Fast & Easy",
    description: "Our intuitive multi-step form makes resume building a breeze. Finish in minutes, not hours.",
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: "Modern Templates",
    description: "Choose from a selection of clean, professional templates that are proven to impress recruiters.",
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: "AI-Powered Suggestions",
    description: "Enhance your resume with AI-driven wording improvements and keyword optimization.",
  },
  {
    icon: <Download className="h-8 w-8 text-accent" />,
    title: "Downloadable Resume",
    description: "Instantly download your completed resume as a PDF, ready to be sent out for job applications.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Everything you need to craft the perfect resume and get hired.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
