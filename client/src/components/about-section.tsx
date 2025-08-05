import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

export default function AboutSection() {
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

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
            Sobre o Dr. Reinaldo Junior
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Especialista em Endodontia com foco em inovação e atendimento
            personalizado
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6 scroll-reveal">
            <h3 className="text-2xl font-bold text-[hsl(220,26%,14%)]">
              Quem é Reinaldo Junior?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Reinaldo Menezes Pereira Junior</strong> é um dentista formado pela UNISA - Campus Interlagos (2018-2022) e especialista em endodontia pelo SENAC (2022-2024). Com experiência profissional em <strong>clínicas de urgência 24 horas</strong>, atualmente Reinaldo atua como endodontista, oferecendo serviços especializados por toda a <strong>Grande São Paulo</strong> e <strong>ABC</strong> através de parcerias.
            </p>

            <h3 className="text-2xl font-bold text-[hsl(220,26%,14%)]">
              O que é EndoDelivery?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              O <strong>EndoDelivery</strong> é um serviço inovador que levo até
              você: tratamento endodôntico especializado fora do consultório
              tradicional. Com equipamentos portáteis de última geração, ofereço
              o mesmo padrão de qualidade em ambientes adaptados, proporcionando
              maior comodidade e acessibilidade aos pacientes.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {[
                "Atendimento no seu Consultório",
                "Equipamentos Portáteis",
                "Tecnologia Avançada",
                "Horários Flexíveis",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[hsl(215,89%,54%)] rounded-full flex items-center justify-center">
                    <Check className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Images */}
          <div className="grid grid-cols-2 gap-4 scroll-reveal">
            <img
              src="/img/About1.jpg"
              alt="Equipamentos odontológicos modernos"
              className="rounded-xl shadow-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              alt="Consultório odontológico moderno"
              className="rounded-xl shadow-lg mt-8 w-full h-48 object-cover"
            />
            <img
              src="/img/About3.JPEG"
              alt="Consulta odontológica profissional"
              className="rounded-xl shadow-lg -mt-8 w-full h-48 object-cover"
            />
            <img
              src="/img/About4.JPEG"
              alt="Tecnologia dental avançada"
              className="rounded-xl shadow-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
