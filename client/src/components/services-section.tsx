import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Microscope } from "lucide-react";

export default function ServicesSection() {
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

  const services = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
        </svg>
      ),
      title: "Tratamento de Canal",
      description:
        "Procedimento endodôntico completo com técnicas modernas para preservar seu dente natural.",
      bgColor: "bg-[hsl(215,89%,54%)]",
    },
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: "EndoDelivery",
      description:
        "Atendimento no seu Consultório com toda segurança e qualidade.",
      bgColor: "bg-[hsl(163,95%,44%)]",
    },
    {
      icon: <Microscope className="w-8 h-8 text-white" />,
      title: "Diagnóstico Avançado",
      description:
        "Avaliação precisa com tecnologia digital para planejamento personalizado do tratamento.",
      bgColor: "bg-[hsl(271,81%,56%)]",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
            Serviços Especializados
          </h2>
          <p className="text-xl text-gray-600">
            Tratamentos endodônticos com tecnologia de ponta
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal hover:transform hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div
                  className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-6`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[hsl(220,26%,14%)] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
