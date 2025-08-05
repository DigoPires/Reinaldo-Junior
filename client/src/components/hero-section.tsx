import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowDown } from "lucide-react";
import DrRJ2 from '/img/DrRJ2.jpg';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const observeScrollReveal = () => {
      const elements = sectionRef.current?.querySelectorAll(".scroll-reveal:not(.revealed)");
      elements?.forEach((el) => observer.observe(el));
    };

    observeScrollReveal();

    const mutationObserver = new MutationObserver(() => {
      observeScrollReveal();
    });

    if (sectionRef.current) {
      mutationObserver.observe(sectionRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-gradient min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white space-y-6 scroll-reveal order-2 lg:order-1">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Dr. Reinaldo Junior
              <span className="block text-2xl md:text-3xl font-light text-blue-100 mt-2">
                Especialista em Endodontia
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Revolucionando o tratamento de canal com o inovador serviço de{" "}
              <strong>EndoDelivery</strong> - Atendimento especializado em toda a cidade de <strong>São Paulo</strong>.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  +1000
                </div>
                <div className="text-blue-100">Canais Tratados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  +10
                </div>
                <div className="text-blue-100">Parceiros</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  +3
                </div>
                <div className="text-blue-100">Anos de Experiência</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all transform hover:scale-105 h-auto"
              >
                <a
                  href="https://api.whatsapp.com/send/?phone=5511986230082&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Agendar Consulta
                </a>
              </Button>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                className="bg-white bg-opacity-20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-30 transition-all backdrop-blur border-white border-opacity-30 h-auto"
              >
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative scroll-reveal order-1 lg:order-2">
            <img
              src="/img/HeroPhoto.jpg"
              alt="Dr. Reinaldo Junior - Especialista em Endodontia"
              className="rounded-2xl shadow-2xl w-full h-auto max-h-[500px] object-cover"
            />

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[hsl(163,95%,44%)] rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(220,26%,14%)]">
                    EndoDelivery
                  </h3>
                  <p className="text-sm text-gray-600">
                    Atendimento no seu consultório
                  </p>
                </div>
              </div>
            </div>

            {/* Google Reviews Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl max-w-xs hidden md:block">
              <a
                href="https://share.google/YsrPU3BLpeBO5VXTG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:bg-gray-50 transition-colors p-2 rounded-lg"
              >
                <div className="w-10 h-10 bg-[hsl(66,79%,58%)] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[hsl(220,26%,14%)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[hsl(220,26%,14%)] text-sm">
                    Google Reviews
                  </h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-1">
                      ★★★★★
                    </div>
                    <span className="text-xs text-gray-600">Ver avaliações</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle hidden md:block">
        <ArrowDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
}
