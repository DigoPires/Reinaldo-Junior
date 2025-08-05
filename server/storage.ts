import { type User, type InsertUser, type Photo, type InsertPhoto, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPhotos(): Promise<Photo[]>;
  getPhoto(id: string): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  deletePhoto(id: string): Promise<void>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private photos: Map<string, Photo>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.photos = new Map();
    this.testimonials = new Map();
    
    // Initialize with default admin user
    // Para produção, use variáveis de ambiente para maior segurança
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminUsername && adminPassword) {
      this.createUser({ username: adminUsername, password: adminPassword });
    }
    
    // Initialize with sample photos
    this.initializePhotos();
    
    // Initialize with testimonials
    this.initializeTestimonials();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getPhoto(id: string): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { 
      ...insertPhoto, 
      id, 
      createdAt: new Date() 
    };
    this.photos.set(id, photo);
    return photo;
  }

  async deletePhoto(id: string): Promise<void> {
    this.photos.delete(id);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  private initializePhotos() {
    const samplePhotos = [
      {
        url: "/img/img1.jpg",
        description: "Procedimento endodôntico sendo realizado"
      },
      {
        url: "/img/img2.jpeg",
        description: "Equipamentos odontológicos modernos"
      },
      {
        url: "/img/img3.jpeg",
        description: "Raio-X e ferramentas de diagnóstico"
      },
      {
        url: "/img/img4.jpeg",
        description: "Interior moderno de consultório odontológico"
      },
      {
        url: "/img/img5.jpeg",
        description: "Consulta odontológica e cuidado com paciente"
      },
      {
        url: "/img/img6.jpeg",
        description: "Tecnologia dental avançada"
      },
      {
        url: "/img/img7.jpeg",
        description: "Instrumentos odontológicos em superfície estéril"
      },
      {
        url: "/img/img8.jpg",
        description: "Interior profissional de clínica odontológica"
      }
    ];

    samplePhotos.forEach(photo => {
      this.createPhoto(photo);
    });
  }

  private initializeTestimonials() {
    const sampleTestimonials = [
      {
        name: "Maria Silva",
        role: "Paciente",
        content: "Excelente profissional! O Dr. Reinaldo fez meu tratamento de canal com muito cuidado e atenção. O serviço de EndoDelivery foi perfeito, recebi o mesmo atendimento de qualidade em casa. Super recomendo!",
        rating: "5"
      },
      {
        name: "João Santos",
        role: "Clínica Odonto Vida",
        content: "Profissional extremamente competente e atencioso. O tratamento endodôntico foi realizado com excelência técnica. A inovação do atendimento domiciliar fez toda diferença na minha experiência. Muito obrigado, Dr. Reinaldo!",
        rating: "5"
      },
      {
        name: "Dra. Carla Sousa",
        role: "Centro Odontológico Sorrir",
        content: "Indicamos o Dr. Reinaldo para todos os nossos pacientes que precisam de tratamento endodôntico. Profissional de excelência, sempre atualizado e com resultados excepcionais. O EndoDelivery é uma revolução no atendimento!",
        rating: "5"
      },
      {
        name: "Ana Lima",
        role: "Paciente",
        content: "Fiz o tratamento de canal com o Dr. Reinaldo e fiquei impressionada com o cuidado e técnica. Sem dor, sem complicações e com resultado perfeito. O atendimento domiciliar foi perfeito para quem tem agenda corrida como eu. Recomendo 100%!",
        rating: "5"
      },
      {
        name: "Dr. Roberto Ferreira",
        role: "Odontologia Ferreira & Associados",
        content: "Como parceiro do Dr. Reinaldo, posso afirmar que é um profissional de altíssimo nível técnico. Nossos pacientes sempre retornam com feedback muito positivo sobre os tratamentos realizados. O conceito de EndoDelivery é inovador e muito bem executado.",
        rating: "5"
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
