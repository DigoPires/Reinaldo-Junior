import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: string;
}

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayTimeout = useRef<NodeJS.Timeout | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

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

    // Função para observar todos os elementos .scroll-reveal não revelados
    const observeScrollReveal = () => {
      const elements = sectionRef.current?.querySelectorAll(".scroll-reveal:not(.revealed)");
      elements?.forEach((el) => observer.observe(el));
    };

    observeScrollReveal();

    // MutationObserver para observar mudanças no DOM e garantir que novos elementos sejam observados
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

  // Função para iniciar o autoplay/resetar timeout
  const startAutoplay = () => {
    if (autoplayTimeout.current) clearTimeout(autoplayTimeout.current);
    if (testimonials.length === 0) return;
    autoplayTimeout.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimeout.current) clearTimeout(autoplayTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    startAutoplay();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-[hsl(215,89%,54%)]",
      "bg-[hsl(163,95%,44%)]",
      "bg-[hsl(271,81%,56%)]",
      "bg-green-500",
      "bg-orange-500",
    ];
    return colors[index % colors.length];
  };

  // Funções de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setTouchStartX(null);
  };

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
              Avaliações dos Pacientes
            </h2>
            <p className="text-gray-600">Carregando avaliações...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
            Avaliações dos Pacientes
          </h2>
          <p className="text-xl text-gray-600">
            O que os pacientes falam sobre o atendimento
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div
            className="overflow-hidden p-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-5">
                  <Card className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow max-w-4xl mx-auto">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 text-xl">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 ${getAvatarColor(
                            index
                          )} rounded-full flex items-center justify-center mr-4`}
                        >
                          <span className="text-white font-semibold">
                            {getInitials(testimonial.name)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[hsl(220,26%,14%)]">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls - só mostra em telas lg+ */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="hidden lg:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4 text-[hsl(215,89%,54%)]" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4 text-[hsl(215,89%,54%)]" />
          </Button>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  startAutoplay();
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-[hsl(215,89%,54%)]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review CTA */}
        <div className="text-center mt-12">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-4xl mx-auto px-4">
            <a
              href="https://share.google/YsrPU3BLpeBO5VXTG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-all transform hover:scale-105 min-w-[280px] w-full md:w-auto shadow-lg border-2 border-yellow-500"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Ver Avaliações no Google
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://share.google/YsrPU3BLpeBO5VXTG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-teal-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-600 transition-all transform hover:scale-105 min-w-[280px] w-full md:w-auto shadow-lg"
            >
              <Star className="mr-2 h-5 w-5" />
              Deixe sua Avaliação
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
