# Portfolio V3

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS. Inspired by [Byron Vargas Hernández's portfolio](https://byronjvh.com/).

## Features

- 🚀 **Next.js 14** with App Router
- 💻 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive design** that works on all devices
- ✨ **Framer Motion** for smooth animations
- 🗄️ **Sanity CMS** for content management
- 🎯 **SEO optimized**
- ⚡ **Fast loading** and performance optimized

## Sections

- **Hero Section**: Animated introduction with typing effect
- **Projects**: Showcase of featured and other projects
- **About Me**: Personal information with code block styling
- **Skills**: Categorized skills with animated checkmarks
- **Education**: Timeline of educational background
- **Contact**: Terminal-style contact form

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-v3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your Sanity project:
   - Create a new project at [sanity.io](https://sanity.io)
   - Add your project ID and dataset to `.env.local`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Sanity CMS Setup

1. Install Sanity CLI:
```bash
npm install -g @sanity/cli
```

2. Initialize Sanity in your project:
```bash
sanity init
```

3. Follow the prompts to create your project

4. Update `sanity.config.ts` with your project details

5. Deploy your Sanity Studio:
```bash
sanity deploy
```

## Content Management

The portfolio uses Sanity CMS for managing content. You can add/edit:

- **Profile**: Personal information
- **Projects**: Portfolio projects with images and links
- **Skills**: Technical skills organized by category
- **Education**: Educational background and achievements

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: '#142',     // Green color
  secondary: '#338',   // Blue color  
  accent: '#00ff88',   // Bright green
}
```

### Content
Update the mock data in `app/page.tsx` or connect to Sanity CMS for dynamic content.

### Animations
Modify Framer Motion animations in each component to match your preferences.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Sanity
- **Icons**: Lucide React
- **Font**: JetBrains Mono

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Design inspiration: [Byron Vargas Hernández](https://byronjvh.com/)
- Icons: [Lucide](https://lucide.dev/)
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me through the website
- Reach out on social media

---

Built with ❤️ using Next.js and Sanity

