# SMART CALIS - Calisthenics Training Assistant

## Project Overview

SMART CALIS is a comprehensive fitness application designed specifically for calisthenics training. It combines:
- **Workout Logging**: Track your calisthenics exercises with detailed stats
- **ML-Powered Analytics**: Predict calories burned during workouts using machine learning
- **AI Coaching**: Get personalized fitness advice from an intelligent chatbot
- **Meal Planning**: Generate personalized meal plans based on your fitness goals
- **Progress Tracking**: Visualize your fitness journey with detailed analytics

## Technology Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi

### ML Service
- **Framework**: Flask
- **ML Libraries**: scikit-learn, pandas, numpy, joblib
- **Model**: Random Forest / XGBoost for calorie prediction

## Project Structure

```
project/
├── frontend/              # Next.js frontend application
├── backend/               # Express.js backend API
├── ml-service/            # Flask ML service
├── docs/                  # Project documentation
├── .gitignore             # Git ignore rules
└── SMART_CALIS_EXECUTION_GUIDE.md
```

## Prerequisites

### Required Software
- **Node.js** v18+ with npm
- **Python** 3.10+
- **Git**
- **MongoDB** (local or MongoDB Atlas cloud)

### Optional
- **Docker Desktop** for containerization
- **MongoDB Compass** for database management
- **Postman** or **Thunder Client** for API testing
- **Jupyter Notebook** for ML development

## Getting Started

### 1. Environment Setup

Refer to **Stage 1** in `SMART_CALIS_EXECUTION_GUIDE.md` for:
- Detailed installation instructions
- Environment variable configuration
- Git setup and branching strategy

### 2. Backend Setup

```bash
cd backend
npm install
# Copy .env.example to .env and update values
cp .env.example .env
# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
# Copy .env.local.example to .env.local and update values
cp .env.local.example .env.local
# Start development server
npm run dev
```

### 4. ML Service Setup

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Copy .env.example to .env and update values
cp .env.example .env
python app.py
```

## Development Stages

The project is organized into 18 sequential development stages documented in `SMART_CALIS_EXECUTION_GUIDE.md`:

1. **Stage 1-2**: Environment & Project Setup
2. **Stage 3**: Database Configuration
3. **Stage 4-5**: Authentication & User Profiles
4. **Stage 6-7**: Exercise Library & Workout Logging
5. **Stage 8-9**: ML Model Development & Integration
6. **Stage 10-12**: Meal Plans, Chatbot & Progress Tracking
7. **Stage 13-14**: Testing
8. **Stage 15**: UI/UX Polish
9. **Stage 16-18**: CI/CD, Deployment & Documentation

## Running Services Locally

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### Terminal 3 - ML Service
```bash
cd ml-service
source venv/bin/activate
python app.py
# Runs on http://localhost:5001
```

## Database Setup

### Using MongoDB Atlas (Recommended)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Add connection string to `.env` file as `MONGODB_URI`
4. Run seed scripts in backend

### Using Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/smart_calis`

## API Documentation

API documentation will be available at `http://localhost:5000/api-docs` (once Swagger documentation is set up).

Current endpoints:
- `/api/auth/*` - Authentication
- `/api/users/*` - User management
- `/api/exercises/*` - Exercise library
- `/api/workouts/*` - Workout logging
- `/api/meals/*` - Meal plans
- `/api/chat/*` - Chatbot
- `/api/progress/*` - Progress tracking

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### ML Service Tests
```bash
cd ml-service
pytest
```

## Deployment

See **Stage 17** in `SMART_CALIS_EXECUTION_GUIDE.md` for:
- Production deployment procedures
- Environment configuration
- MongoDB Atlas setup
- Service deployment (Vercel, Render, Railway)
- CI/CD pipeline setup

## Contributing

Please follow the development guide mentioned in the stages for:
- Code style guidelines
- Git workflow
- Commit message format
- Pull request procedures

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ML_API_URL=http://localhost:5001
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart_calis
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
ML_SERVICE_URL=http://localhost:5001
OPENAI_API_KEY=your_key
CORS_ORIGIN=http://localhost:3000
```

### ML Service (.env)
```
FLASK_PORT=5001
FLASK_ENV=development
MODEL_PATH=./models/calorie_model.pkl
CORS_ORIGIN=http://localhost:5000
```

## Troubleshooting

Common issues and solutions are documented in **Stage 18** of the guide.

## Documentation

- [SMART_CALIS_EXECUTION_GUIDE.md](./SMART_CALIS_EXECUTION_GUIDE.md) - Complete project guide
- [docs/](./docs/) - Additional documentation

## License

This is a Final Year Project for educational purposes.

## Support

Refer to the SMART_CALIS_EXECUTION_GUIDE.md for:
- Detailed stage-by-stage instructions
- Troubleshooting guide
- Common pitfalls to avoid
- Best practices and tips

---

**Ready to start? Begin with Stage 2: Project Initialization**
