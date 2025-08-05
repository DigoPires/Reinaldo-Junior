import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  url: string;
  description: string | null;
}

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { data: photos = [] } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImageIndex, photos.length]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + photos.length) % photos.length
    );
  };

  if (photos.length === 0) {
    return (
      <section id="gallery" ref={sectionRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
              Galeria de Casos
            </h2>
            <p className="text-gray-600">Carregando galeria...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
              Galeria de Casos
            </h2>
            <p className="text-xl text-gray-600">
              Trabalhos realizados com pacientes reais
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:scale-105 aspect-square"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.description || "Foto da galeria"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeLightbox}
        >
          {/* Botão X fora da foto */}
          <Button
            onClick={e => { e.stopPropagation(); closeLightbox(); }}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
            style={{ position: "fixed" }}
          >
            <X className="h-8 w-8" />
          </Button>

          {/* Seta esquerda fora da foto */}
          <Button
            onClick={e => { e.stopPropagation(); prevImage(); }}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10"
            style={{ position: "fixed" }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Seta direita fora da foto */}
          <Button
            onClick={e => { e.stopPropagation(); nextImage(); }}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10"
            style={{ position: "fixed" }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Conteúdo do lightbox: impedir propagação do clique */}
          <div
            className="relative flex items-center justify-center max-w-full max-h-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={photos[currentImageIndex]?.url}
              alt={photos[currentImageIndex]?.description || "Foto ampliada"}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
