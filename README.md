# Shelter Housing Ltd. Website

A premium real estate development company website showcasing luxury residential and commercial projects.

## Overview

This is the official website for Shelter Housing Ltd., featuring:
- **Hero Section** with dynamic animations
- **Featured Projects** carousel showcasing ongoing, completed, and upcoming developments
- **About Section** highlighting company values and expertise
- **Why Choose Us** section with key differentiators
- **Testimonials** from satisfied clients
- **Contact Form** with EmailJS integration
- **Responsive Design** optimized for all devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **GSAP** for smooth animations
- **Lucide React** for icons
- **EmailJS** for contact form functionality
- **React Router** for navigation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd shelter_housing_ltd_website

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contact Form Setup

The contact form uses EmailJS. To configure:

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{phone}}` - Sender's phone
   - `{{message}}` - Message content
   - `{{time}}` - Timestamp

4. Copy `.env.example` to `.env` and add your credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # React components
├── constants/       # Project data and configuration
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── pages/           # Page components
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## Deployment

Build the production bundle:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

© 2025 Shelter Housing Ltd. All rights reserved.
