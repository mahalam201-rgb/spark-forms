# Spark Forms - AI-Powered Form Builder

A modern, feature-rich web application for creating, sharing, and analyzing forms powered by AI.

## Features

- **AI Form Generator**: Let AI generate complete forms based on a topic
- **Advanced Analytics**: Visualize form responses with beautiful charts and graphs
- **Easy Sharing**: Share via link, QR code, WhatsApp, or Telegram
- **Export Options**: Export responses to PDF or CSV
- **Beautiful UI**: Modern, responsive design built with React and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd spark-forms
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── app/
  │   ├── layout.tsx       # Root layout
  │   ├── page.tsx         # Home page
  │   └── globals.css      # Global styles
  └── components/
      ├── Navigation.tsx   # Navigation bar
      ├── Hero.tsx         # Hero section
      ├── Features.tsx     # Features section
      └── Footer.tsx       # Footer
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel will automatically detect Next.js and configure build settings
5. Click "Deploy"

### Deploy to Other Platforms

#### AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]
```

## Environment Variables

Create a `.env.local` file for local development:

```
# Add your environment variables here
```

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
