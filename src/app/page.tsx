import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              ¿Tiene un proyecto en mente?
            </h2>
            <p className="text-lg text-secondary mb-12">
              Estamos aquí para ayudarle. Contáctenos para obtener un presupuesto gratuito 
              y descubrir cómo podemos hacer realidad su proyecto.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contacto">
                <Button variant="cta" size="lg" className="min-w-[200px] group">
                  Contactar ahora
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a 
                href="tel:+34977350508" 
                className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 text-base font-medium text-primary hover:text-white border-2 border-primary hover:bg-primary rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                977 350 508
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
} 