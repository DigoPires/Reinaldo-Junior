# Overview

This is a modern, responsive dental website for "Dentista Delivery" featuring Dr. Reinaldo Junior, a specialist in endodontics. The site is built as a full-stack application with a React frontend and Express backend, designed to showcase the doctor's services, particularly his innovative "EndoDelivery" home service offering. The website includes sections for professional presentation, services, testimonials, photo gallery, contact information, and an administrative area for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with a custom dental theme color palette (blues, turquoise, and professional dark tones)
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Custom CSS animations with intersection observer for scroll-based reveals

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with JSON responses
- **Authentication**: Simple username/password authentication for admin access
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development**: Hot module replacement via Vite integration in development mode

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Three main entities - users (admin), photos (gallery management), and testimonials
- **Development Storage**: In-memory storage implementation for development/demo purposes
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Migrations**: Drizzle Kit for database schema management

## Authentication and Authorization
- **Admin Authentication**: Single admin user with hardcoded credentials (username: "admin", password: "dentista2024")
- **Session Management**: Simple authentication state without persistent sessions
- **Protected Routes**: Admin panel protected by login requirement
- **Authorization**: Basic role-based access (admin vs public user)

## External Dependencies
- **Database**: Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- **UI Framework**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS for utility-first styling approach
- **Build Tools**: Vite for fast development and optimized production builds
- **Form Validation**: Zod for runtime type validation and schema definition
- **Date Handling**: date-fns for date formatting and manipulation
- **Image Handling**: Lightbox functionality for gallery photo viewing
- **Development**: tsx for TypeScript execution and esbuild for production bundling

The application follows a modular component architecture with clear separation between client and server code, shared schemas for type safety, and a responsive design optimized for dental practice marketing needs.