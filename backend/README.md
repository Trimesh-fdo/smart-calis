# Backend - SMART CALIS

Express.js Node.js backend API for SMART CALIS calisthenics training platform.

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update values with your actual configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_calis
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
ML_SERVICE_URL=http://localhost:5001
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:3000
```

### Database Setup

1. Create MongoDB database (local or Atlas)
2. Update `MONGODB_URI` in `.env`
3. Seed initial data (when seed scripts are created)

### Start Development Server

```bash
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000)

### Start Production Server

```bash
npm start
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

### Testing

```bash
npm test
npm run test:coverage
```

## Project Structure

```
src/
├── routes/         # API route definitions
├── controllers/    # Route handlers (business logic)
├── models/         # Mongoose schemas
├── middleware/     # Express middleware
├── services/       # Business logic services
├── utils/          # Utility functions and helpers
├── config/         # Configuration files
├── validations/    # Input validation schemas (Joi)
└── app.js          # Express app setup
server.js          # Server entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token (if implemented)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PATCH /api/users/password` - Change password

### Exercises
- `GET /api/exercises` - List all exercises
- `GET /api/exercises/:id` - Get single exercise
- `GET /api/exercises/category/:category` - Filter by category
- `GET /api/exercises/difficulty/:level` - Filter by difficulty

### Workouts
- `POST /api/workouts` - Create workout
- `GET /api/workouts` - List workouts
- `GET /api/workouts/:id` - Get single workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/stats` - Get statistics

### Meal Plans
- `POST /api/meals/generate` - Generate meal plan
- `GET /api/meals/current` - Get current meal plan
- `GET /api/meals` - List meal plans
- `GET /api/meals/:id` - Get single meal plan
- `DELETE /api/meals/:id` - Delete meal plan

### Chat
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/history` - Get chat history
- `DELETE /api/chat/history` - Clear chat history

### Progress
- `POST /api/progress/weight` - Log weight
- `GET /api/progress/weight` - Get weight history
- `GET /api/progress/overview` - Get progress overview
- `DELETE /api/progress/weight/:id` - Delete weight log

## Key Features

- User authentication with JWT
- User profile management
- Exercise database with filtering
- Workout logging and tracking
- ML-powered calorie prediction
- Meal plan generation
- AI chatbot integration
- Progress tracking
- Input validation with Joi
- MongoDB integration with Mongoose
- CORS enabled

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation
- **Axios** - HTTP client

## Available Scripts

```bash
npm run dev        # Start development with nodemon
npm start          # Start production server
npm test           # Run tests
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## External Service Integration

### ML Service
- Predicts calories burned during workouts
- Endpoint: `POST /ml/predict-calories`

### OpenAI/Anthropic
- Powers the fitness chatbot
- Requires API key in .env

## Error Handling

All endpoints return standardized JSON responses:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Deployment

See main README for deployment instructions.

## Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Authentication](https://jwt.io/)
