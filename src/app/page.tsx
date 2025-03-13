import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Necesitas alguno de nuestros servicios?
              </h3>
              <p className="text-lg mb-8">
                Contáctanos para obtener un presupuesto personalizado
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/contacto"
                  className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 text-base font-medium text-white bg-black/20 hover:bg-black/30 rounded-lg transition-colors"
                >
                  Solicitar presupuesto
                </Link>
                <a
                  href="tel:+34977350508"
                  className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 text-base font-medium text-white bg-black/20 hover:bg-black/30 rounded-lg transition-colors"
                >
                  Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
} 