import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg backdrop-blur-md"
          : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-[hsl(220,26%,14%)]">
                Dentista Delivery
              </h1>
              <p className="text-sm text-gray-600">Dr. Reinaldo Junior</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Avaliações
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Galeria
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)] px-3 py-2 text-sm font-medium transition-colors"
              >
                Contato
              </button>
              <Link
                href="/admin"
                className="bg-[hsl(215,89%,54%)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[hsl(215,89%,48%)] transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-3 py-2 text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)]"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)]"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-3 py-2 text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)]"
            >
              Avaliações
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-3 py-2 text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)]"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 text-[hsl(220,26%,14%)] hover:text-[hsl(215,89%,54%)]"
            >
              Contato
            </button>
            <Link
              href="/admin"
              className="block w-full text-left px-3 py-2 bg-[hsl(215,89%,54%)] text-white rounded-lg mt-2 font-semibold hover:bg-[hsl(215,89%,48%)]"
            >
              Área Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
