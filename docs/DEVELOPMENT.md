# development flow and instructions

## Monorepo Structure

```
project/
├── frontend/              # Next.js frontend
├── backend/               # Express.js backend  
├── ml-service/            # Flask ML service
├── docs/                  # Documentation
├── .gitignore             # Git ignore rules
├── README.md              # Project overview
└── SMART_CALIS_EXECUTION_GUIDE.md
```

## Starting All Services

Use three terminal windows:

### Terminal 1 - Backend
```bash
cd backend
npm install         # Run only first time
npm run dev         # Starts on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install         # Run only first time
npm run dev         # Starts on http://localhost:3000
```

### Terminal 3 - ML Service
```bash
cd ml-service
python -m venv venv              # Run only first time
source venv/bin/activate         # Windows: venv\Scripts\activate
pip install -r requirements.txt  # Run only first time
python app.py                    # Starts on http://localhost:5001
```

## Common Commands

### Backend Commands
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start dev server with hot reload
npm start            # Start production server
npm test             # Run tests
npm run lint         # Check code style
npm run format       # Format code
```

### Frontend Commands
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Check code style
npm run format       # Format code
```

### ML Service Commands
```bash
cd ml-service
python -m venv venv              # Create virtual environment
source venv/bin/activate         # Activate venv (Windows: venv\Scripts\activate)
pip install -r requirements.txt  # Install dependencies
python app.py                    # Start dev server
pytest                           # Run tests
```

## Environment Setup

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your settings
npm install
npm run dev
```

### ML Service Setup
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings
python app.py
```

## Git Workflow

### Creating a Feature Branch
```bash
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: add feature"
git push origin feature/feature-name
```

### Committing Changes
```bash
git add .
git commit -m "type: brief description"
# Types: feat, fix, docs, style, refactor, test, chore
```

### Pulling Latest Changes
```bash
git pull origin develop
```

## Testing Services

### Test Backend API
```bash
# Using curl
curl http://localhost:5000/api/health

# Using Postman
# Create new request
# GET http://localhost:5000/api/exercises
```

### Test ML Service
```bash
# Using curl with JSON payload
curl -X POST http://localhost:5001/ml/predict-calories \
  -H "Content-Type: application/json" \
  -d '{
    "user": {"age": 25, "weight": 75, "gender": "male"},
    "workout": {"duration": 45}
  }'
```

### Test Frontend
```bash
# Open browser
open http://localhost:3000
```

## Database Management

### Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Navigate to smart_calis database
4. Browse collections and documents

### MongoDB CLI
```bash
# Connect to local MongoDB
mongosh mongodb://localhost:27017/smart_calis

# Show databases
show dbs

# Show collections
show collections

# Query data
db.users.find()
db.exercises.find()
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000          # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>          # macOS/Linux
taskkill /PID <PID> /F # Windows
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install

# Python virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### MongoDB Connection Failed
1. Check if MongoDB is running
2. Verify connection string in .env
3. Try connecting with Compass
4. Check firewall settings

### Services Not Communicating
1. Verify ports: Backend (5000), Frontend (3000), ML (5001)
2. Check API URLs in .env files
3. Check CORS settings
4. Verify services are running

## Branch Strategy

```
main
  ├── develop
  │   ├── feature/auth
  │   ├── feature/workouts
  │   ├── feature/meals
  │   └── feature/chatbot
  ...
```

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Individual feature branches
- `bugfix/*`: Bug fix branches

## Next Steps

Continue with **Stage 2: Project Initialization** from the main execution guide.
