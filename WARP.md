# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
Roop Clinic is a Next.js 15 website for a cosmetic surgery clinic specializing in rhinoplasty, cosmetology, gynecology, and liposuction services. The project uses TypeScript, TailwindCSS v4, and shadcn/ui components with a custom design system.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack  
npm run build

# Start production server
npm start

# Install dependencies
npm install
```

### Component Management
```bash
# Add new shadcn/ui components (requires npx shadcn@latest add)
# Example: npx shadcn@latest add button
# Components are configured with "new-york" style and custom aliases
```

## Architecture & Structure

### Design System
- **Color Palette**: Medical/healthcare themed with custom CSS variables in `app/globals.css`
  - Primary: `#0074B7` (medical blue)
  - Background: `#F5F7F8` (light gray)
  - Accent: `#F6DE84` (warm yellow)
  - Card backgrounds: `#D5EDFD` (light blue), `#E0F0F5` (secondary blue)

- **Typography**: Uses Google Fonts with CSS variables
  - Body text: Open Sans (`--font-open-sans`)
  - Headings: Playfair Display (`--font-playfair`)

### Component System
- **ServiceCard**: Flexible component with three variants (`default`, `compact`, `centered`) for displaying medical services
- **Navbar**: Client-side navigation with active route highlighting and responsive logo
- Custom component aliases configured in `components.json` point to `@/components/*`

### Layout Architecture
- Uses Next.js App Router with TypeScript
- Root layout (`app/layout.tsx`) provides:
  - Persistent navbar with sticky positioning
  - Full-width footer with clinic contact information
  - Responsive container with max-width constraints (1067px)
  - Font loading and CSS variable injection

### Page Structure
All pages follow a consistent pattern:
- `/` - Homepage with hero section, services overview, and doctor profiles
- `/services` - Services listing page
- `/doctors` - Doctor profiles page  
- `/gallery` - Image gallery page
- `/contact` - Contact information page

### Styling Approach
- TailwindCSS v4 with PostCSS configuration
- Custom theme inline definitions in `globals.css`
- Extensive use of custom rounded corners (`rounded-2xl`, `rounded-[80px]`)
- Responsive design with mobile-first approach
- Custom scrollbar hiding utilities

### Asset Management
- Images stored in `/public` directory with organized subdirectories:
  - `/public/logos/` - Brand logos
  - `/public/icons/` - Service and UI icons
  - `/public/gallery/` - Photo content
  - `/public/banners/` - Hero and banner images

### State Management
- Uses Next.js built-in client components with `"use client"` directive
- Navigation state managed via `usePathname` hook in Navbar
- No external state management libraries

## Key Development Patterns

### Component Development
- Follow the existing ServiceCard pattern for flexible, variant-based components
- Use TypeScript interfaces for props with optional properties
- Implement responsive design with Tailwind's responsive prefixes
- Maintain consistent spacing and border radius patterns

### Image Handling
- Use Next.js Image component for logos and critical images
- Use standard HTML img tags for decorative/content images
- Maintain consistent sizing patterns (specific pixel values for consistency)

### CSS Custom Properties
- Leverage the extensive CSS variable system for colors and spacing
- Use semantic color names (`--color-roop-primary`) rather than hex values in components
- Follow the established font family variable pattern

### Navigation & Routing
- All routes should be added to the `nav` array in `components/Navbar.tsx`
- Follow the established pattern of using Next.js Link components
- Maintain active state styling consistency

## Technical Configuration

### TypeScript Setup
- Strict mode enabled with comprehensive compiler options
- Path aliases configured: `@/*` maps to project root
- Next.js plugin integration for optimal type checking

### TailwindCSS v4
- Uses new inline theme configuration in CSS
- Custom PostCSS plugin integration
- tw-animate-css for additional animation utilities

### shadcn/ui Integration
- Configured with "new-york" style variant
- Custom component aliases for organized imports
- Lucide React for iconography

This project prioritizes visual consistency, responsive design, and maintainable component architecture suitable for a professional medical website.