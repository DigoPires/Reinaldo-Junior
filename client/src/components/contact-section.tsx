import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Instagram, Facebook, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://api.whatsapp.com/send/?phone=5511986230082&text&type=phone_number&app_absent=0",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      bgColor: "bg-green-500 hover:bg-green-600",
      description: "Conversa direta para agendamento",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_reijunior/",
      icon: <Instagram className="h-6 w-6" />,
      bgColor: "bg-pink-500 hover:bg-pink-600",
      description: "@_reijunior",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/reinaldo.junior.315865",
      icon: <Facebook className="h-6 w-6" />,
      bgColor: "bg-blue-600 hover:bg-blue-700",
      description: "Reinaldo Junior",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-[hsl(220,26%,14%)] mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-600">
            Agende sua consulta ou tire suas dúvidas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 scroll-reveal">
            <h3 className="text-2xl font-bold text-[hsl(220,26%,14%)]">
              Conecte-se Comigo
            </h3>

            {/* Social Media Links */}
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                >
                  <div
                    className={`w-12 h-12 ${link.bgColor} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform text-white`}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(220,26%,14%)]">
                      {link.name}
                    </h4>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-[hsl(220,26%,14%)] mb-4">
                  Informações de Contato
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="text-[hsl(215,89%,54%)] mr-3 h-5 w-5" />
                    <span className="text-gray-700">(11) 98623-0082</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-[hsl(215,89%,54%)] mr-3 h-5 w-5" />
                    <span className="text-gray-700">
                      reijunior1512@gmail.com
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="scroll-reveal">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[hsl(220,26%,14%)] mb-6">
                  Envie uma Mensagem
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Seu nome</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Seu email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Seu telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Sua mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[hsl(215,89%,54%)] text-white py-4 rounded-xl font-semibold hover:bg-[hsl(215,89%,48%)] transition-all transform hover:scale-105 h-auto"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending
                      ? "Enviando..."
                      : "Enviar Mensagem"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
