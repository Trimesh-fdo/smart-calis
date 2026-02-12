# Frontend - SMART CALIS

Next.js TypeScript frontend application for SMART CALIS calisthenics training platform.

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Update values:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ML_API_URL=http://localhost:5001
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

### Testing

```bash
npm test
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable React components
├── contexts/         # React Context providers (Auth, etc.)
├── hooks/            # Custom React hooks
├── services/         # API services (auth, workout, meal, etc.)
├── styles/           # Global styles
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── config/           # Configuration files
```

## Key Features

- User authentication and profile management
- Exercise library with filtering and search
- Workout logging with ML-powered calorie predictions
- Meal plan generation
- AI chatbot for fitness guidance
- Progress tracking with visualizations
- Responsive design for mobile and desktop

## Technologies

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Recharts** - Data visualization
- **Axios** - HTTP client

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
npm test          # Run tests
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
