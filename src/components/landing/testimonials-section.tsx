import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const testimonials = [
  {
    quote: "This resume builder is a game-changer! The interface is so clean and the AI suggestions helped me land more interviews. Highly recommended!",
    name: "Sarah L.",
    title: "UX Designer",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
  },
  {
    quote: "I was able to create a professional-looking resume in under 15 minutes. The real-time preview feature is amazing. A must-use tool for any job seeker.",
    name: "Michael B.",
    title: "Software Engineer",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
  },
  {
    quote: "Finally, a resume tool that understands what modern recruiters are looking for. The templates are sleek and the final PDF looks incredible.",
    name: "Jessica P.",
    title: "Product Manager",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-3'),
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Loved by Professionals</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <p className="italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center">
                  {testimonial.image && (
                    <Image
                      src={testimonial.image.imageUrl}
                      alt={`Portrait of ${testimonial.name}`}
                      width={48}
                      height={48}
                      className="rounded-full"
                      data-ai-hint={testimonial.image.imageHint}
                    />
                  )}
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
