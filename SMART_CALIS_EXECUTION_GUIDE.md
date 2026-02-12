# Smart Calis - Complete Stage-Based Execution Guide
## From Installation to Production Deployment

---

## Table of Contents
1. [Pre-Development Setup](#pre-development-setup)
2. [Stage 1: Environment Configuration](#stage-1-environment-configuration)
3. [Stage 2: Project Initialization](#stage-2-project-initialization)
4. [Stage 3: Database Setup](#stage-3-database-setup)
5. [Stage 4: Authentication System](#stage-4-authentication-system)
6. [Stage 5: User Profile Management](#stage-5-user-profile-management)
7. [Stage 6: Exercise Library](#stage-6-exercise-library)
8. [Stage 7: Workout Logging System](#stage-7-workout-logging-system)
9. [Stage 8: ML Model Development](#stage-8-ml-model-development)
10. [Stage 9: ML Service Implementation](#stage-9-ml-service-implementation)
11. [Stage 10: Meal Plan Generation](#stage-10-meal-plan-generation)
12. [Stage 11: Chatbot Integration](#stage-11-chatbot-integration)
13. [Stage 12: Progress Tracking](#stage-12-progress-tracking)
14. [Stage 13: Unit Testing Implementation](#stage-13-unit-testing-implementation)
15. [Stage 14: Integration Testing](#stage-14-integration-testing)
16. [Stage 15: UI/UX Polish & Responsive Design](#stage-15-uiux-polish--responsive-design)
17. [Stage 16: CI/CD Pipeline Setup](#stage-16-cicd-pipeline-setup)
18. [Stage 17: Production Deployment](#stage-17-production-deployment)
19. [Stage 18: Monitoring & Documentation](#stage-18-monitoring--documentation)

---

## Pre-Development Setup

### Required Software Installation

#### 1. Core Development Tools
- **Node.js**: Download and install Node.js v18+ (includes npm)
  - Verify installation with version check
  - Configure npm global path

- **Python**: Install Python 3.10+
  - Add Python to system PATH
  - Verify pip installation
  - Configure virtual environment support

- **Git**: Install Git for version control
  - Configure global user name and email
  - Set up SSH keys for GitHub/GitLab
  - Configure default branch name

- **VS Code**: Install Visual Studio Code
  - Install recommended extensions (ESLint, Prettier, Python, MongoDB)
  - Configure settings for formatting
  - Set up workspace preferences

#### 2. Database Tools
- **MongoDB**: Choose one option
  - Option A: Install MongoDB Community Server locally
  - Option B: Create MongoDB Atlas cloud account (recommended)
  
- **MongoDB Compass**: Install GUI for database management
  - Connect to your MongoDB instance
  - Familiarize with interface

#### 3. API Development Tools
- **Postman** or **Thunder Client**: For API testing
  - Create account
  - Set up workspace
  - Learn basic request creation

#### 4. Optional but Recommended
- **Docker Desktop**: For containerization (later stages)
- **Jupyter Notebook**: For ML model development
  - Install via Anaconda or pip

### Development Machine Requirements
- Minimum 8GB RAM (16GB recommended)
- 20GB free disk space
- Stable internet connection
- Modern web browser (Chrome/Firefox)

### Account Creation Checklist
- [ ] GitHub account created
- [ ] MongoDB Atlas account (if using cloud)
- [ ] OpenAI API account (for chatbot)
- [ ] Vercel account (for frontend deployment)
- [ ] Render/Railway account (for backend deployment)

---

## Stage 1: Environment Configuration

### Objectives
Set up the complete development environment with all necessary tools and configurations.

### Tasks

#### 1.1 System Preparation
- Create project root directory
- Set up folder structure for monorepo approach
- Initialize Git repository
- Create .gitignore file for Node.js and Python

#### 1.2 Node.js Environment
- Verify Node.js version compatibility
- Update npm to latest version
- Configure npm registry (if behind proxy/firewall)
- Set up nvm (Node Version Manager) for version management

#### 1.3 Python Environment
- Create Python virtual environment
- Activate virtual environment
- Upgrade pip to latest version
- Install virtualenv or venv globally

#### 1.4 Git Configuration
- Initialize Git in project root
- Create initial commit
- Set up remote repository on GitHub
- Configure branch protection rules
- Create development branch

#### 1.5 Environment Variables Planning
- Plan all required environment variables
- Create .env.example files for each service
- Document what each variable does
- Plan secrets management strategy

### Deliverables
- [ ] All software installed and verified
- [ ] Git repository initialized
- [ ] Project folder structure created
- [ ] Virtual environment ready
- [ ] Configuration files documented

---

## Stage 2: Project Initialization

### Objectives
Initialize all three main projects (Frontend, Backend, ML Service) with proper configurations.

### Tasks

#### 2.1 Frontend Project Setup
- Create Next.js project with TypeScript
- Select App Router (not Pages Router)
- Configure TailwindCSS during setup
- Install ESLint and Prettier
- Configure absolute imports with path aliases
- Set up folder structure as per architecture blueprint
- Install core dependencies (axios, react-hook-form, etc.)
- Configure next.config.js
- Set up tailwind.config.js
- Create .env.local file

#### 2.2 Backend Project Setup
- Create backend directory
- Initialize npm project
- Install Express.js and core dependencies
- Install Mongoose for MongoDB
- Install authentication packages (jsonwebtoken, bcryptjs)
- Install validation packages (Joi)
- Install development dependencies (nodemon)
- Set up folder structure as per blueprint
- Create .env file
- Configure ESLint for backend
- Set up entry point (server.js)

#### 2.3 ML Service Project Setup
- Create ml-service directory
- Create Python virtual environment
- Create requirements.txt file
- Install Flask
- Install ML libraries (scikit-learn, pandas, numpy)
- Install model persistence libraries (joblib, pickle)
- Create folder structure for ML service
- Set up .env file for Flask
- Create app.py entry point

#### 2.4 Development Scripts Configuration
- Configure package.json scripts for frontend (dev, build, start)
- Configure package.json scripts for backend (dev, start)
- Create Python run scripts
- Document how to start each service
- Test that all services can start independently

#### 2.5 Version Control
- Create comprehensive .gitignore files
- Make initial commits for each service
- Create feature branch for development
- Tag initial version

### Deliverables
- [ ] Frontend Next.js project initialized
- [ ] Backend Express project initialized
- [ ] ML Service Flask project initialized
- [ ] All dependencies installed
- [ ] Development scripts working
- [ ] Initial Git commits made

---

## Stage 3: Database Setup

### Objectives
Set up MongoDB database, create all collections, define schemas, and establish connections.

### Tasks

#### 3.1 MongoDB Installation/Setup
- Choose between local MongoDB or MongoDB Atlas
- If local: Install MongoDB Community Edition
- If cloud: Create MongoDB Atlas cluster
- Configure network access and database users
- Create database named "smart_calis"
- Install MongoDB Compass and connect

#### 3.2 Backend Database Connection
- Install Mongoose in backend
- Create database configuration file
- Implement connection logic with error handling
- Add connection string to .env
- Test database connection on server start
- Implement connection retry logic
- Add connection event listeners

#### 3.3 Mongoose Schema Definition
- Create User schema with all fields
- Create Exercise schema
- Create Workout schema with embedded exercises
- Create MealPlan schema
- Create WeightLog schema
- Create ChatConversation schema
- Create CaloriePrediction schema
- Add schema validations
- Add timestamps to all schemas
- Define indexes for performance

#### 3.4 Database Relationships
- Implement references between schemas
- Set up population for related documents
- Configure cascade delete where needed
- Test relationship queries

#### 3.5 Seed Data Preparation
- Create exercises.json with calisthenics exercises
- Create meals.json with meal database
- Write seed script to populate exercises
- Write seed script to populate meals
- Execute seed scripts
- Verify data in MongoDB Compass

#### 3.6 Database Utilities
- Create database helper functions
- Implement transaction support (if needed)
- Create backup script
- Create data reset script for development

### Deliverables
- [ ] MongoDB running and accessible
- [ ] Database connection established
- [ ] All schemas created and tested
- [ ] Seed data loaded
- [ ] Database utilities created
- [ ] Connection verified from backend

---

## Stage 4: Authentication System

### Objectives
Implement complete user registration, login, and JWT-based authentication system.

### Tasks

#### 4.1 Backend Authentication Logic
- Create User model with password hashing
- Install bcryptjs for password hashing
- Implement password hashing middleware (pre-save hook)
- Install jsonwebtoken package
- Create JWT utility functions (sign, verify)
- Configure JWT secret and expiration in .env

#### 4.2 Authentication Middleware
- Create authentication middleware
- Implement JWT token verification
- Extract user from token
- Handle expired tokens
- Handle invalid tokens
- Protect routes with middleware

#### 4.3 Auth Controller & Routes
- Create authController with register function
- Create authController with login function
- Implement input validation for registration
- Implement input validation for login
- Create auth routes file
- Define POST /api/auth/register endpoint
- Define POST /api/auth/login endpoint
- Test routes with Postman

#### 4.4 Frontend Auth UI
- Create login page component
- Create registration page component
- Create login form with validation
- Create registration form with validation
- Install react-hook-form for form management
- Implement client-side validation
- Style forms with TailwindCSS

#### 4.5 Frontend Auth Service
- Create axios instance with base URL
- Create authService.js file
- Implement register API call
- Implement login API call
- Implement logout function
- Handle API errors

#### 4.6 Auth State Management
- Create AuthContext
- Implement AuthProvider component
- Store JWT token in localStorage
- Create useAuth custom hook
- Implement isAuthenticated state
- Implement user state
- Add token to axios headers globally

#### 4.7 Protected Routes
- Create ProtectedRoute component
- Implement redirect to login if not authenticated
- Wrap dashboard routes with protection
- Test authentication flow

#### 4.8 Token Management
- Implement token refresh logic (optional but recommended)
- Handle token expiration gracefully
- Auto-logout on token expiry
- Clear token on logout

### Deliverables
- [ ] User registration working
- [ ] User login working
- [ ] JWT tokens generated and validated
- [ ] Frontend auth UI complete
- [ ] Auth state management working
- [ ] Protected routes implemented
- [ ] Full auth flow tested end-to-end

---

## Stage 5: User Profile Management

### Objectives
Build user profile viewing and editing functionality with all required fitness information.

### Tasks

#### 5.1 Backend Profile Endpoints
- Create userController file
- Implement GET /api/users/profile endpoint
- Implement PUT /api/users/profile endpoint
- Implement PATCH /api/users/password endpoint
- Add authentication middleware to all routes
- Implement input validation for profile update
- Handle profile image (optional - file upload)

#### 5.2 Profile Data Validation
- Define Joi schema for profile update
- Validate age (18-100)
- Validate gender (male/female/other)
- Validate height (100-250 cm)
- Validate weight (30-300 kg)
- Validate fitness level (beginner/intermediate/advanced)
- Validate fitness goal (fat_loss/maintenance/muscle_gain)

#### 5.3 Frontend Profile Service
- Create profileService.js
- Implement getProfile API call
- Implement updateProfile API call
- Implement changePassword API call
- Handle errors appropriately

#### 5.4 Profile Page UI
- Create profile page component
- Display current profile information
- Create edit mode toggle
- Build profile edit form
- Implement form pre-population with current data
- Add form validation
- Style with TailwindCSS

#### 5.5 Profile Components
- Create ProfileCard component
- Create ProfileEditForm component
- Create PasswordChangeForm component
- Create StatsDisplay component (optional)
- Make components reusable

#### 5.6 User Context Enhancement
- Add user profile to UserContext
- Implement profile update in context
- Sync profile changes across app
- Add loading states

#### 5.7 Profile Features
- Display BMI calculation
- Display TDEE calculation
- Show account creation date
- Show last login (optional)
- Add profile completion percentage

### Deliverables
- [ ] Profile viewing working
- [ ] Profile editing working
- [ ] Password change working
- [ ] Profile UI complete and responsive
- [ ] Validation working on both ends
- [ ] Profile data synced across app

---

## Stage 6: Exercise Library

### Objectives
Create a comprehensive calisthenics exercise library with filtering and searching capabilities.

### Tasks

#### 6.1 Exercise Model Enhancement
- Review and finalize Exercise schema
- Add additional fields if needed (equipment, video links)
- Create indexes for search optimization
- Validate schema with sample data

#### 6.2 Exercise Seed Data
- Research calisthenics exercises
- Create comprehensive exercises.json
- Include 30-50 exercises minimum
- Categorize by muscle groups
- Assign difficulty levels
- Add MET values for calorie calculation
- Include descriptions and instructions
- Add progressions/regressions

#### 6.3 Backend Exercise Endpoints
- Create exerciseController
- Implement GET /api/exercises (all exercises)
- Implement GET /api/exercises/:id (single)
- Implement GET /api/exercises/category/:category
- Implement GET /api/exercises/difficulty/:level
- Implement search functionality
- Add pagination support
- Add filtering and sorting

#### 6.4 Exercise Service (Frontend)
- Create exerciseService.js
- Implement fetchExercises function
- Implement fetchExerciseById function
- Implement fetchByCategory function
- Implement fetchByDifficulty function
- Implement search function
- Cache exercise data (optional)

#### 6.5 Exercise Library UI
- Create exercise library page
- Create ExerciseCard component
- Create ExerciseList component
- Create ExerciseFilter component
- Create ExerciseSearch component
- Display exercises in grid layout
- Implement responsive design

#### 6.6 Exercise Details
- Create ExerciseDetail modal/page
- Display full exercise information
- Show muscle groups targeted
- Show difficulty level
- Display instructions
- Add video/image if available
- Add "Add to Workout" button (for later)

#### 6.7 Filtering and Search
- Implement category filter
- Implement difficulty filter
- Implement muscle group filter
- Implement text search
- Allow multiple filter combinations
- Show filter results count
- Add clear filters button

### Deliverables
- [ ] Exercise database populated
- [ ] Exercise API endpoints working
- [ ] Exercise library UI complete
- [ ] Filtering and search working
- [ ] Exercise details display working
- [ ] Responsive design implemented

---

## Stage 7: Workout Logging System

### Objectives
Build complete workout logging functionality allowing users to track their calisthenics sessions.

### Tasks

#### 7.1 Workout Schema Finalization
- Review Workout schema
- Define exercise sub-schema structure
- Add validation rules
- Create indexes
- Plan data denormalization strategy

#### 7.2 Backend Workout Endpoints
- Create workoutController
- Implement POST /api/workouts (create)
- Implement GET /api/workouts (list with pagination)
- Implement GET /api/workouts/:id (single)
- Implement PUT /api/workouts/:id (update)
- Implement DELETE /api/workouts/:id (delete)
- Implement GET /api/workouts/stats (statistics)
- Add date range filtering
- Add sorting options

#### 7.3 Workout Validation
- Create Joi schema for workout creation
- Validate date format
- Validate exercise array structure
- Validate sets/reps/duration values
- Ensure at least one exercise
- Validate notes length

#### 7.4 Workout Service (Frontend)
- Create workoutService.js
- Implement createWorkout function
- Implement fetchWorkouts function
- Implement fetchWorkoutById function
- Implement updateWorkout function
- Implement deleteWorkout function
- Implement fetchWorkoutStats function
- Handle errors appropriately

#### 7.5 Workout Logging UI
- Create "Log Workout" page
- Create WorkoutForm component
- Create ExerciseSelector component
- Create ExerciseRow component (sets/reps/duration inputs)
- Add date picker
- Add notes textarea
- Implement form validation
- Style with TailwindCSS

#### 7.6 Exercise Selection Interface
- Build searchable exercise selector
- Allow multiple exercise selection
- Display selected exercises
- Allow reordering exercises
- Allow removing exercises
- Show exercise details on hover

#### 7.7 Dynamic Form Handling
- Allow adding multiple sets
- Dynamic form fields for exercises
- Calculate total duration automatically
- Show workout summary before submit
- Implement form reset after submission

#### 7.8 Workout History UI
- Create workout history page
- Create WorkoutCard component
- Display workouts in timeline/list
- Show workout summary (date, duration, exercises)
- Add expand/collapse for details
- Implement pagination or infinite scroll
- Add delete confirmation dialog
- Add edit workout functionality

#### 7.9 Workout Details Display
- Create WorkoutDetail component
- Show all exercise details
- Display sets/reps/duration per exercise
- Show predicted calories (placeholder for now)
- Display workout notes
- Add edit and delete buttons

### Deliverables
- [ ] Workout creation working
- [ ] Workout listing working
- [ ] Workout editing working
- [ ] Workout deletion working
- [ ] Workout statistics endpoint ready
- [ ] UI for logging workouts complete
- [ ] Workout history display working
- [ ] Form validation working

---

## Stage 8: ML Model Development

### Objectives
Develop, train, and evaluate machine learning model for calorie prediction.

### Tasks

#### 8.1 Data Collection Strategy
- Research existing calorie burn datasets
- Identify relevant features for calisthenics
- Plan synthetic data generation if needed
- Collect user demographic data requirements
- Gather exercise MET values from research

#### 8.2 Dataset Preparation
- Create or obtain training dataset
- Minimum 500-1000 data points recommended
- Include diverse user profiles (age, weight, gender)
- Include various exercises and durations
- Include workout intensities
- Save as CSV file
- Document data sources

#### 8.3 Jupyter Notebook Setup
- Install Jupyter Notebook
- Create notebooks/ directory in ml-service
- Create model_training.ipynb notebook
- Install data science libraries
- Import necessary packages

#### 8.4 Exploratory Data Analysis
- Load dataset into pandas DataFrame
- Check data shape and info
- Display statistical summary
- Check for missing values
- Identify outliers
- Visualize data distributions
- Analyze feature correlations
- Plot relationships between features and target

#### 8.5 Data Preprocessing
- Handle missing values (imputation or removal)
- Encode categorical variables (gender, fitness level)
- Feature scaling/normalization
- Split data into train/test sets (80/20)
- Create validation set if needed
- Document preprocessing steps

#### 8.6 Feature Engineering
- Create derived features if beneficial
- Combine features (e.g., BMI from height/weight)
- Apply polynomial features if needed
- Test feature importance
- Select final feature set

#### 8.7 Model Selection & Training
- Import sklearn algorithms
- Train baseline Linear Regression model
- Train Random Forest Regressor
- Train XGBoost Regressor (optional)
- Train Gradient Boosting Regressor (optional)
- Use cross-validation for each model
- Document training parameters

#### 8.8 Model Evaluation
- Calculate MAE (Mean Absolute Error)
- Calculate RMSE (Root Mean Squared Error)
- Calculate R² score
- Compare all models
- Create evaluation metrics table
- Visualize predictions vs actual
- Analyze residuals
- Document model performance

#### 8.9 Hyperparameter Tuning
- Select best performing model
- Use GridSearchCV or RandomizedSearchCV
- Tune hyperparameters
- Retrain with best parameters
- Evaluate tuned model
- Compare with initial model

#### 8.10 Model Saving
- Select final best model
- Save model using joblib or pickle
- Save scaler/encoder objects
- Save feature names
- Create models/ directory
- Document model version
- Note date and performance metrics

#### 8.11 Model Documentation
- Document complete training process
- List all features used
- Document preprocessing steps
- Record final model metrics
- Note any limitations
- Create model card (description)

### Deliverables
- [ ] Training dataset prepared
- [ ] Jupyter notebook with complete EDA
- [ ] Multiple models trained and compared
- [ ] Best model selected and tuned
- [ ] Model saved as .pkl file
- [ ] Model evaluation metrics documented
- [ ] Training process fully documented

---

## Stage 9: ML Service Implementation

### Objectives
Create Flask API service to serve the ML model and integrate with backend.

### Tasks

#### 9.1 Flask Application Structure
- Create app.py file
- Set up Flask application instance
- Configure Flask settings
- Set up CORS for backend communication
- Create helper modules (preprocess.py, predict.py)

#### 9.2 Model Loading
- Load trained model in Flask app
- Load scaler/encoder objects
- Implement model caching to avoid reloading
- Handle model loading errors
- Verify model loads successfully

#### 9.3 Prediction Endpoint Development
- Create POST /ml/predict-calories endpoint
- Define expected input JSON structure
- Document required fields
- Implement request validation
- Return structured JSON response

#### 9.4 Feature Preprocessing Logic
- Create preprocessing function
- Accept user and workout data
- Encode categorical variables
- Scale numerical features
- Match training data format exactly
- Handle missing optional fields

#### 9.5 Prediction Logic
- Extract features from request
- Preprocess features
- Make prediction using loaded model
- Post-process prediction (round, validate)
- Handle prediction errors
- Return prediction with metadata

#### 9.6 Health Check Endpoint
- Create GET /ml/health endpoint
- Return service status
- Return model version
- Return model metrics
- Use for monitoring

#### 9.7 Error Handling
- Implement try-catch blocks
- Return appropriate HTTP status codes
- Return structured error messages
- Log errors for debugging
- Handle invalid input gracefully

#### 9.8 API Documentation
- Document endpoint URLs
- Document request format
- Document response format
- Provide example requests/responses
- Document error codes

#### 9.9 ML Service Testing
- Test with Postman/curl
- Test with various input combinations
- Test edge cases (min/max values)
- Test error scenarios
- Verify predictions are reasonable

#### 9.10 Backend Integration
- Create mlService.js in backend
- Implement axios call to ML service
- Configure ML service URL in .env
- Handle ML service errors
- Implement timeout handling
- Test integration

#### 9.11 Workout-ML Integration
- Update workout creation endpoint
- Call ML service after workout created
- Store predicted calories in Workout document
- Create CaloriePrediction record
- Handle ML service unavailability
- Return calories to frontend

#### 9.12 Frontend Display
- Update WorkoutForm to show predictions
- Display predicted calories after submission
- Show calories in workout history
- Display calories in workout details
- Format calories display nicely

### Deliverables
- [ ] Flask ML service running
- [ ] Prediction endpoint working
- [ ] Model successfully loaded
- [ ] Integration with backend complete
- [ ] Calories displayed on frontend
- [ ] Error handling implemented
- [ ] Service tested thoroughly

---

## Stage 10: Meal Plan Generation

### Objectives
Implement automated meal plan generation based on user goals and calorie requirements.

### Tasks

#### 10.1 Nutrition Calculation Utilities
- Create calorieCalculator.js utility
- Implement BMR calculation (Harris-Benedict equation)
- Implement TDEE calculation
- Implement calorie adjustment for goals
- Create macroCalculator.js utility
- Implement macro split calculation (protein/carbs/fats)
- Add activity factor calculations
- Test formulas with sample data

#### 10.2 Meal Database Preparation
- Research balanced meal options
- Create meals.json database
- Include 50-100 meal options
- Categorize by meal type (breakfast/lunch/dinner/snack)
- Add nutritional information (calories, protein, carbs, fats)
- Add ingredients lists
- Add preparation instructions (optional)
- Consider dietary preferences

#### 10.3 Meal Selection Algorithm
- Create mealGenerationService.js
- Implement algorithm to select meals
- Match total calories to target
- Match macro ratios to target
- Distribute calories across 4 meals
- Ensure meal variety
- Handle edge cases

#### 10.4 Backend Meal Endpoints
- Create mealController
- Implement POST /api/meals/generate
- Implement GET /api/meals/current
- Implement GET /api/meals (history)
- Implement GET /api/meals/:id
- Implement DELETE /api/meals/:id
- Add authentication middleware
- Add validation

#### 10.5 Meal Plan Generation Logic
- Retrieve user profile
- Retrieve recent workout data
- Calculate average daily calorie burn
- Calculate target calories based on goal
- Calculate macro targets
- Call meal generation algorithm
- Create MealPlan document
- Return meal plan to frontend

#### 10.6 Frontend Meal Service
- Create mealService.js
- Implement generateMealPlan function
- Implement fetchCurrentMealPlan function
- Implement fetchMealPlanHistory function
- Implement deleteMealPlan function
- Handle loading states
- Handle errors

#### 10.7 Meal Plan UI
- Create meal plan page
- Create MealPlanCard component
- Create MealItem component
- Create MacroBreakdown component
- Display all 4 meals
- Show nutritional information per meal
- Show total daily nutrition
- Style with TailwindCSS

#### 10.8 Macro Visualization
- Install chart library (Recharts or Chart.js)
- Create pie chart for macro breakdown
- Create bar chart for meal comparison
- Display targets vs actual
- Make charts responsive

#### 10.9 Meal Plan Actions
- Add "Generate New Plan" button
- Add delete meal plan functionality
- Add regenerate for specific date
- Show loading during generation
- Show success message
- Handle generation errors

#### 10.10 Meal Plan History
- Display past meal plans
- Show date and calories
- Allow viewing old plans
- Implement pagination
- Add search/filter by date

### Deliverables
- [ ] Calorie calculation working
- [ ] Macro calculation working
- [ ] Meal database populated
- [ ] Meal generation algorithm working
- [ ] Meal plan endpoints working
- [ ] Meal plan UI complete
- [ ] Charts displaying properly
- [ ] Full meal plan flow tested

---

## Stage 11: Chatbot Integration

### Objectives
Integrate AI-powered chatbot for fitness guidance and support.

### Tasks

#### 11.1 AI API Setup
- Choose AI provider (OpenAI or Anthropic Claude)
- Create API account
- Obtain API key
- Understand pricing and limits
- Add API key to backend .env
- Test API access

#### 11.2 Chatbot Service (Backend)
- Create chatbotService.js
- Install AI SDK (openai or anthropic)
- Implement chat completion function
- Configure system prompt for fitness context
- Implement context injection
- Handle API errors
- Implement token limit handling

#### 11.3 Context Preparation
- Retrieve user profile data
- Retrieve recent workout data
- Retrieve current meal plan
- Format context for AI prompt
- Keep context concise
- Update context with each message

#### 11.4 Chat Conversation Management
- Finalize ChatConversation schema
- Implement conversation retrieval
- Implement message appending
- Limit conversation history (last 10-20 messages)
- Implement conversation reset
- Handle concurrent conversations

#### 11.5 Backend Chat Endpoints
- Create chatController
- Implement POST /api/chat/message
- Implement GET /api/chat/history
- Implement DELETE /api/chat/history
- Add authentication middleware
- Implement rate limiting
- Add input validation

#### 11.6 Chat Logic Flow
- Receive user message
- Retrieve conversation history
- Prepare user context
- Construct AI prompt
- Call AI API
- Receive AI response
- Save both messages to database
- Return AI response to frontend

#### 11.7 Frontend Chat Service
- Create chatService.js
- Implement sendMessage function
- Implement fetchChatHistory function
- Implement clearHistory function
- Handle streaming (optional)
- Handle errors

#### 11.8 Chat UI Components
- Create chat page
- Create ChatWindow component
- Create MessageBubble component
- Create ChatInput component
- Style user vs assistant messages differently
- Add timestamps
- Make scrollable

#### 11.9 Chat Functionality
- Display chat history on page load
- Implement message sending
- Auto-scroll to latest message
- Show typing indicator while waiting
- Display errors gracefully
- Add clear history button
- Implement message timestamps

#### 11.10 Chat Features (Optional)
- Add suggested questions/prompts
- Add copy message functionality
- Add message rating (thumbs up/down)
- Add export chat history
- Add voice input (advanced)

#### 11.11 System Prompt Engineering
- Write effective system prompt
- Define chatbot personality
- Specify fitness knowledge scope
- Add safety guidelines
- Test and refine prompts
- Handle inappropriate requests

### Deliverables
- [ ] AI API integrated
- [ ] Chat endpoints working
- [ ] Chat UI complete and responsive
- [ ] Context injection working
- [ ] Conversation persistence working
- [ ] Chat history display working
- [ ] Error handling implemented
- [ ] Full chat flow tested

---

## Stage 12: Progress Tracking

### Objectives
Implement comprehensive progress tracking with weight logging and data visualization.

### Tasks

#### 12.1 Weight Logging Backend
- Review WeightLog schema
- Create progressController
- Implement POST /api/progress/weight (create)
- Implement GET /api/progress/weight (history)
- Implement DELETE /api/progress/weight/:id
- Add date validation
- Prevent duplicate entries for same date

#### 12.2 Progress Statistics Endpoint
- Implement GET /api/progress/overview
- Calculate total workouts
- Calculate total calories burned
- Calculate average calories per workout
- Get current weight vs starting weight
- Calculate weight change
- Get recent weight trend
- Calculate workout frequency

#### 12.3 Workout Statistics Endpoint
- Implement GET /api/workouts/stats
- Aggregate workouts by week
- Aggregate calories by week
- Calculate workout streaks
- Get most frequent exercises
- Calculate time period statistics

#### 12.4 Frontend Progress Service
- Create progressService.js
- Implement logWeight function
- Implement fetchWeightHistory function
- Implement fetchProgressOverview function
- Implement deleteWeightLog function
- Handle errors

#### 12.5 Weight Logging UI
- Create WeightLogForm component
- Add date picker for log date
- Add weight input with validation
- Add optional notes field
- Implement form submission
- Add to progress page or modal
- Style with TailwindCSS

#### 12.6 Chart Library Setup
- Choose chart library (Recharts or Chart.js)
- Install chart library
- Create reusable chart components
- Configure chart styling
- Make charts responsive

#### 12.7 Weight Tracking Visualization
- Create WeightChart component
- Fetch weight history data
- Plot weight over time (line chart)
- Add target weight line
- Show weight change
- Add date range selector (30/60/90 days)
- Make interactive

#### 12.8 Workout Statistics Visualization
- Create CalorieChart component
- Create WorkoutFrequencyChart component
- Display workouts per week (bar chart)
- Display calories burned trend (line/bar chart)
- Show averages
- Add comparisons

#### 12.9 Progress Dashboard Page
- Create progress page layout
- Add StatsCard components for key metrics
- Display current vs starting weight
- Display total workouts
- Display total calories burned
- Display current streak
- Arrange in grid layout
- Make responsive

#### 12.10 Progress Features
- Add weight goal setting
- Calculate estimated time to goal
- Show progress percentage
- Add motivational messages
- Display recent achievements
- Add data export functionality (CSV)

#### 12.11 Data Visualization Polish
- Add chart tooltips
- Add chart legends
- Choose appropriate colors
- Ensure accessibility
- Add empty states for no data
- Add loading skeletons

### Deliverables
- [ ] Weight logging working
- [ ] Weight history retrieval working
- [ ] Progress statistics calculated
- [ ] Charts displaying data correctly
- [ ] Progress page UI complete
- [ ] Statistics accurate
- [ ] Visualizations responsive
- [ ] Full progress tracking tested

---

## Stage 13: Unit Testing Implementation

### Objectives
Implement comprehensive unit tests for backend, frontend, and ML service.

### Tasks

#### 13.1 Backend Testing Setup
- Choose testing framework (Jest or Mocha/Chai)
- Install testing dependencies
- Install supertest for API testing
- Configure test scripts in package.json
- Create test directory structure
- Set up test database configuration
- Configure test environment variables

#### 13.2 Backend Test Structure
- Create tests/ directory
- Create unit/ subdirectory
- Create integration/ subdirectory
- Create fixtures/ for test data
- Create helpers/ for test utilities
- Set up before/after hooks

#### 13.3 Model Unit Tests
- Test User model validation
- Test password hashing
- Test Workout model validation
- Test Exercise model validation
- Test MealPlan model validation
- Test WeightLog model validation
- Test schema defaults
- Test schema methods

#### 13.4 Utility Function Tests
- Test calorieCalculator functions (BMR, TDEE)
- Test macroCalculator functions
- Test validators
- Test helper functions
- Test edge cases
- Test error handling

#### 13.5 Controller Unit Tests
- Test authController functions
- Mock database calls
- Test validation logic
- Test error responses
- Test success responses
- Test userController functions
- Test workoutController functions
- Test all controllers

#### 13.6 Service Unit Tests
- Test mlService integration (mock ML API)
- Test chatbotService (mock AI API)
- Test mealGenerationService logic
- Test error handling in services
- Mock external dependencies

#### 13.7 API Integration Tests
- Test authentication endpoints
- Test user endpoints with JWT
- Test workout endpoints (CRUD)
- Test exercise endpoints
- Test meal endpoints
- Test chat endpoints
- Test progress endpoints
- Test unauthorized access
- Test invalid inputs

#### 13.8 Frontend Testing Setup
- Install Jest (comes with Next.js)
- Install React Testing Library
- Install jest-dom for assertions
- Configure jest.config.js
- Set up test utilities
- Configure test environment

#### 13.9 Frontend Component Tests
- Test LoginForm component
- Test RegisterForm component
- Test WorkoutForm component
- Test ProfileEditForm component
- Test ExerciseCard component
- Test MealPlanCard component
- Test ChatWindow component
- Test navigation components
- Test form validations
- Test button clicks
- Test conditional rendering

#### 13.10 Frontend Hook Tests
- Test useAuth hook
- Test custom hooks
- Test hook state changes
- Mock API calls in hooks

#### 13.11 Frontend Service Tests
- Test authService functions
- Test workoutService functions
- Test other service functions
- Mock axios calls
- Test error handling

#### 13.12 ML Service Testing Setup
- Install pytest
- Create tests/ directory
- Configure pytest.ini
- Create test fixtures

#### 13.13 ML Service Tests
- Test Flask app initialization
- Test prediction endpoint
- Test preprocessing function
- Test with sample inputs
- Test error cases
- Test model loading
- Test health endpoint
- Mock model predictions

#### 13.14 Test Coverage
- Configure coverage tools (Jest --coverage, pytest-cov)
- Run coverage reports
- Aim for >80% coverage
- Identify untested code
- Add missing tests
- Generate coverage HTML reports

#### 13.15 Test Documentation
- Document test structure
- Document how to run tests
- Document test naming conventions
- Document mocking strategies
- Create testing guidelines

### Deliverables
- [ ] Backend unit tests written (>80% coverage)
- [ ] Backend integration tests written
- [ ] Frontend component tests written
- [ ] Frontend service tests written
- [ ] ML service tests written
- [ ] All tests passing
- [ ] Coverage reports generated
- [ ] Testing documentation complete

---

## Stage 14: Integration Testing

### Objectives
Test complete user flows and system integration across all services.

### Tasks

#### 14.1 Test Environment Setup
- Set up separate test database
- Configure test environment variables
- Create test user accounts
- Prepare test data
- Start all services in test mode

#### 14.2 End-to-End Testing Setup
- Choose E2E framework (Playwright or Cypress)
- Install E2E testing tool
- Configure E2E test settings
- Set up test scripts
- Create test helpers

#### 14.3 Authentication Flow Tests
- Test complete registration flow
- Test complete login flow
- Test logout flow
- Test protected route access
- Test token expiration
- Test invalid credentials
- Test duplicate registration

#### 14.4 User Profile Flow Tests
- Test profile viewing
- Test profile editing
- Test profile validation
- Test password change
- Test profile update persistence

#### 14.5 Workout Flow Tests
- Test exercise library browsing
- Test exercise filtering
- Test workout creation with multiple exercises
- Test workout submission
- Test calorie prediction integration
- Test workout viewing
- Test workout editing
- Test workout deletion
- Test workout history pagination

#### 14.6 Meal Plan Flow Tests
- Test meal plan generation
- Test calorie calculation accuracy
- Test macro distribution
- Test meal plan display
- Test meal plan history
- Test meal plan deletion

#### 14.7 Chat Flow Tests
- Test sending messages
- Test receiving responses
- Test conversation persistence
- Test chat history
- Test context awareness (manual verification)
- Test clearing history

#### 14.8 Progress Tracking Flow Tests
- Test weight logging
- Test weight history display
- Test chart rendering
- Test statistics calculation
- Test data visualization

#### 14.9 Cross-Service Integration Tests
- Test frontend → backend → database flow
- Test backend → ML service integration
- Test backend → AI API integration
- Test data consistency across services
- Test error propagation

#### 14.10 Performance Testing
- Test page load times
- Test API response times
- Test ML prediction speed
- Test concurrent user handling
- Identify bottlenecks
- Optimize slow operations

#### 14.11 Security Testing
- Test SQL injection attempts
- Test XSS attempts
- Test CSRF protection
- Test unauthorized access
- Test JWT manipulation
- Test rate limiting
- Test input sanitization

#### 14.12 Browser Compatibility Testing
- Test on Chrome
- Test on Firefox
- Test on Safari
- Test on Edge
- Fix browser-specific issues

#### 14.13 Responsive Design Testing
- Test on mobile devices (375px, 414px)
- Test on tablets (768px, 1024px)
- Test on desktop (1280px, 1920px)
- Test landscape and portrait modes
- Fix responsive issues

#### 14.14 Error Scenario Testing
- Test network failures
- Test service unavailability
- Test invalid data submissions
- Test edge cases
- Verify error messages are user-friendly

#### 14.15 User Acceptance Testing
- Recruit 5-10 test users
- Prepare testing scenarios
- Collect feedback
- Identify usability issues
- Prioritize and fix issues

### Deliverables
- [ ] E2E tests written and passing
- [ ] All user flows tested
- [ ] Integration points verified
- [ ] Performance benchmarks documented
- [ ] Security testing complete
- [ ] Cross-browser compatibility verified
- [ ] Responsive design verified
- [ ] UAT feedback collected and addressed

---

## Stage 15: UI/UX Polish & Responsive Design

### Objectives
Refine user interface, improve user experience, and ensure perfect responsive design.

### Tasks

#### 15.1 UI Audit
- Review all pages for consistency
- Check color scheme consistency
- Verify typography consistency
- Check spacing and alignment
- Identify UI inconsistencies
- Document needed improvements

#### 15.2 Component Refinement
- Standardize button styles
- Standardize input field styles
- Standardize card styles
- Standardize spacing patterns
- Create consistent hover states
- Create consistent focus states
- Ensure accessibility (ARIA labels)

#### 15.3 Loading States
- Add loading spinners for all async operations
- Add skeleton loaders for content
- Add progress indicators
- Show loading state in buttons
- Disable buttons during loading
- Add smooth transitions

#### 15.4 Error Handling UI
- Design error message components
- Implement toast notifications
- Add inline form errors
- Add error boundaries (React)
- Show friendly error messages
- Add retry mechanisms
- Style error states

#### 15.5 Empty States
- Design empty state for workout history
- Design empty state for meal plans
- Design empty state for chat
- Design empty state for progress
- Add helpful messages
- Add call-to-action buttons

#### 15.6 Success Feedback
- Add success toast notifications
- Add success messages after actions
- Add subtle animations
- Add checkmarks and confirmations
- Implement optimistic UI updates

#### 15.7 Navigation Enhancement
- Improve navbar/sidebar
- Add active link highlighting
- Add breadcrumbs
- Improve mobile navigation
- Add hamburger menu for mobile
- Test navigation flow

#### 15.8 Responsive Design Review
- Test all pages on mobile (320px-480px)
- Test all pages on tablet (768px-1024px)
- Test all pages on desktop (1280px+)
- Fix overflow issues
- Fix spacing issues
- Adjust font sizes
- Optimize layouts

#### 15.9 Mobile-Specific Improvements
- Adjust touch target sizes (min 44px)
- Optimize form inputs for mobile
- Improve mobile navigation
- Test mobile gestures
- Optimize images for mobile
- Test on actual devices

#### 15.10 Accessibility Improvements
- Add alt text to images
- Ensure proper heading hierarchy
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen reader
- Check color contrast ratios
- Add focus indicators

#### 15.11 Performance Optimization
- Optimize images (compress, use WebP)
- Implement lazy loading
- Code splitting for routes
- Minimize bundle size
- Optimize font loading
- Remove unused CSS
- Implement caching strategies

#### 15.12 Animation and Transitions
- Add smooth page transitions
- Add subtle hover animations
- Add loading animations
- Add scroll animations (optional)
- Keep animations performant
- Respect reduced motion preferences

#### 15.13 Dashboard Enhancement
- Create informative dashboard widgets
- Add data visualizations
- Show recent activity
- Add quick action buttons
- Implement dashboard customization (optional)
- Make dashboard engaging

#### 15.14 UX Flow Improvements
- Reduce clicks to complete tasks
- Add shortcuts
- Improve form flows
- Add helpful tooltips
- Add onboarding tooltips (optional)
- Simplify complex interfaces

#### 15.15 Visual Design Polish
- Refine color palette
- Improve typography hierarchy
- Add visual hierarchy
- Use whitespace effectively
- Add subtle shadows
- Polish icons
- Ensure design consistency

### Deliverables
- [ ] Consistent UI across all pages
- [ ] All loading states implemented
- [ ] Error handling polished
- [ ] Empty states designed
- [ ] Fully responsive on all devices
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] Smooth animations added
- [ ] Professional visual design

---

## Stage 16: CI/CD Pipeline Setup

### Objectives
Implement automated testing, building, and deployment pipelines.

### Tasks

#### 16.1 Version Control Best Practices
- Review Git workflow (feature branches)
- Set up branch protection rules
- Require pull request reviews
- Configure .gitignore properly
- Tag releases
- Write good commit messages

#### 16.2 GitHub Actions Setup
- Create .github/workflows directory
- Understand GitHub Actions syntax
- Plan workflow triggers
- Plan workflow jobs
- Configure secrets in GitHub

#### 16.3 Backend CI Pipeline
- Create backend-ci.yml workflow
- Set up Node.js environment
- Install dependencies
- Run linting (ESLint)
- Run unit tests
- Run integration tests
- Generate coverage report
- Upload coverage to codecov (optional)
- Configure to run on pull requests and push to main

#### 16.4 Frontend CI Pipeline
- Create frontend-ci.yml workflow
- Set up Node.js environment
- Install dependencies
- Run linting (ESLint)
- Run type checking (if using TypeScript)
- Run unit tests
- Run build process
- Check for build errors
- Configure to run on pull requests and push to main

#### 16.5 ML Service CI Pipeline
- Create ml-service-ci.yml workflow
- Set up Python environment
- Install dependencies from requirements.txt
- Run linting (flake8 or pylint)
- Run pytest tests
- Generate coverage report
- Configure to run on pull requests and push to main

#### 16.6 Code Quality Checks
- Configure ESLint rules
- Configure Prettier
- Set up pre-commit hooks (Husky)
- Add lint-staged for staged files
- Configure Python linting
- Ensure code quality standards

#### 16.7 Automated Testing in CI
- Ensure all tests run in CI environment
- Configure test database for CI
- Mock external services in CI
- Set test timeouts
- Parallelize tests if possible
- Fail build on test failures

#### 16.8 Build Automation
- Automate frontend build
- Automate backend build (if needed)
- Check build output
- Verify build artifacts
- Optimize build process

#### 16.9 Docker Integration (Optional)
- Create Dockerfile for each service
- Create docker-compose.yml for local dev
- Build Docker images in CI
- Push images to container registry
- Version Docker images
- Test Docker deployments

#### 16.10 CD Pipeline - Frontend
- Set up deployment to Vercel
- Configure Vercel project
- Connect GitHub repository
- Set up environment variables in Vercel
- Configure automatic deployments
- Set up preview deployments for PRs
- Test deployment process

#### 16.11 CD Pipeline - Backend
- Choose deployment platform (Render, Railway, Heroku)
- Create account and project
- Connect GitHub repository
- Configure environment variables
- Set up automatic deployments
- Configure health checks
- Test deployment

#### 16.12 CD Pipeline - ML Service
- Deploy ML service to same/separate platform
- Ensure model file is included
- Configure environment variables
- Set up continuous deployment
- Test accessibility from backend

#### 16.13 Database Management
- Set up MongoDB Atlas for production
- Configure connection strings
- Set up database backups
- Plan data migration strategy
- Secure database access

#### 16.14 Environment Management
- Separate dev/staging/production environments
- Configure environment variables for each
- Ensure secrets are not in code
- Use platform secret management
- Document environment setup

#### 16.15 Monitoring and Alerts
- Set up uptime monitoring (UptimeRobot)
- Set up error tracking (Sentry - optional)
- Configure deployment notifications
- Set up performance monitoring
- Configure alerts for failures

#### 16.16 Deployment Documentation
- Document CI/CD pipeline
- Document deployment process
- Document rollback procedures
- Document environment variables
- Create deployment checklist

### Deliverables
- [ ] CI pipelines running for all services
- [ ] Automated tests in CI
- [ ] Code quality checks automated
- [ ] CD pipelines configured
- [ ] Automatic deployments working
- [ ] Environment variables configured
- [ ] Monitoring set up
- [ ] CI/CD documentation complete

---

## Stage 17: Production Deployment

### Objectives
Deploy the complete application to production and ensure it's fully functional.

### Tasks

#### 17.1 Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Backup strategy in place
- [ ] Rollback plan documented
- [ ] Performance tested
- [ ] Security reviewed

#### 17.2 MongoDB Atlas Production Setup
- Create production cluster
- Configure cluster tier (M0 free or paid)
- Set up database user with strong password
- Configure IP whitelist (allow from backend server)
- Create database indexes
- Configure backup retention
- Note connection string

#### 17.3 Environment Variables Configuration
- List all required environment variables
- Set up secrets in deployment platforms
- Configure production API keys
- Set NODE_ENV to production
- Configure CORS origins
- Set secure JWT secrets
- Configure ML service URL
- Configure database connection strings

#### 17.4 Frontend Deployment (Vercel)
- Connect GitHub repository to Vercel
- Configure build settings
- Set up environment variables
- Configure domain (custom or vercel.app)
- Deploy to production
- Verify deployment successful
- Test frontend in production
- Configure analytics (optional)

#### 17.5 Backend Deployment (Render/Railway/Heroku)
- Create new project/service
- Connect GitHub repository
- Configure build and start commands
- Set up environment variables
- Configure health check endpoint
- Deploy to production
- Note production URL
- Verify deployment successful

#### 17.6 ML Service Deployment
- Deploy ML service to cloud platform
- Ensure Python version matches dev
- Include model files in deployment
- Configure environment variables
- Set up scaling if needed
- Note production URL
- Test ML endpoint

#### 17.7 Service Integration
- Update frontend API URL to production backend
- Update backend ML service URL
- Test cross-service communication
- Verify CORS configuration
- Test authentication flow
- Verify all integrations working

#### 17.8 Database Seeding
- Connect to production database
- Run exercise seed script
- Run meal seed script
- Verify seed data
- Create admin user if needed

#### 17.9 SSL/HTTPS Configuration
- Verify SSL certificates (auto on Vercel/Render)
- Ensure all connections use HTTPS
- Configure secure cookies
- Update environment URLs to HTTPS
- Test secure connections

#### 17.10 Production Testing
- Test complete registration flow
- Test complete login flow
- Test workout logging with ML prediction
- Test meal plan generation
- Test chatbot (verify API costs)
- Test progress tracking
- Test on multiple devices
- Test performance

#### 17.11 Performance Optimization
- Enable compression
- Configure caching headers
- Optimize database queries
- Add database indexes
- Monitor response times
- Optimize slow endpoints

#### 17.12 Error Monitoring Setup
- Set up Sentry or similar (optional)
- Configure error reporting
- Test error tracking
- Set up alerts for critical errors
- Monitor error rates

#### 17.13 Analytics Setup (Optional)
- Set up Google Analytics
- Configure analytics events
- Track user flows
- Monitor usage patterns
- Privacy compliance check

#### 17.14 Domain Configuration (Optional)
- Purchase custom domain
- Configure DNS settings
- Connect domain to Vercel
- Configure domain for backend (if applicable)
- Verify domain works
- Set up redirects

#### 17.15 Final Production Verification
- Test all features in production
- Verify data persistence
- Test error scenarios
- Verify email notifications (if implemented)
- Check logs for errors
- Monitor resource usage
- Conduct load testing (optional)

### Deliverables
- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] ML service deployed and accessible
- [ ] Database configured and seeded
- [ ] All services communicating
- [ ] HTTPS enabled
- [ ] Production fully tested
- [ ] Monitoring configured
- [ ] Domain configured (if applicable)

---

## Stage 18: Monitoring & Documentation

### Objectives
Set up monitoring, create comprehensive documentation, and prepare for handover.

### Tasks

#### 18.1 Application Monitoring
- Set up uptime monitoring (UptimeRobot)
- Monitor all service endpoints
- Configure alert notifications (email/SMS)
- Set up performance monitoring
- Monitor API response times
- Track error rates
- Monitor database performance
- Create monitoring dashboard

#### 18.2 Resource Monitoring
- Monitor server CPU usage
- Monitor memory usage
- Monitor disk space
- Monitor database storage
- Set up alerts for resource limits
- Monitor API rate limits
- Track ML service usage
- Track AI API costs

#### 18.3 User Documentation
- Write user manual
- Document registration process
- Document workout logging
- Document meal plan generation
- Document chatbot usage
- Document progress tracking
- Add screenshots for each feature
- Create video tutorial (optional)

#### 18.4 Technical Documentation
- Document system architecture
- Document API endpoints (detailed)
- Document database schema
- Document ML model details
- Document authentication flow
- Document deployment architecture
- Create architecture diagrams
- Document technology stack

#### 18.5 Developer Documentation
- Write comprehensive README for each service
- Document setup instructions
- Document environment variables
- Document npm/pip scripts
- Document testing procedures
- Document Git workflow
- Document coding standards
- Add inline code comments

#### 18.6 API Documentation
- Document all API endpoints
- Specify request/response formats
- Document authentication requirements
- Provide example requests
- Provide example responses
- Document error codes
- List status codes
- Create Postman collection

#### 18.7 Deployment Documentation
- Document deployment process step-by-step
- Document environment configuration
- Document rollback procedures
- Document scaling procedures
- Document backup procedures
- Document monitoring setup
- Create deployment checklist
- Document troubleshooting steps

#### 18.8 Database Documentation
- Document database schema
- Document relationships
- Document indexes
- Document seed data
- Document backup strategy
- Document migration procedures
- Create ER diagrams

#### 18.9 ML Model Documentation
- Document training process
- Document dataset details
- Document feature engineering
- Document model selection
- Document performance metrics
- Document prediction logic
- Document model limitations
- Create model card

#### 18.10 Testing Documentation
- Document testing strategy
- Document test coverage
- Document how to run tests
- Document test data setup
- Document E2E test scenarios
- Document manual testing checklist

#### 18.11 Security Documentation
- Document authentication mechanism
- Document authorization rules
- Document data encryption
- Document API security
- Document security best practices
- Document known vulnerabilities (if any)
- Document security testing results

#### 18.12 Maintenance Documentation
- Create maintenance guide
- Document common issues and solutions
- Document update procedures
- Document dependency updates
- Document monitoring procedures
- Create incident response plan

#### 18.13 Project Report (FYP)
- Write project abstract
- Write introduction and objectives
- Document methodology
- Describe system design
- Document implementation details
- Present results and testing
- Include screenshots and diagrams
- Write conclusions
- Add references
- Format according to university guidelines

#### 18.14 Presentation Preparation
- Create presentation slides
- Prepare demo script
- Record demo video (optional)
- Prepare for questions
- Rehearse presentation
- Prepare backup plans (offline demo)
- Create handouts (optional)

#### 18.15 Code Repository Organization
- Organize repository structure
- Add comprehensive README
- Add LICENSE file
- Add CONTRIBUTING guidelines (if open source)
- Clean up old branches
- Tag final release version
- Archive deprecated code
- Make repository presentable

### Deliverables
- [ ] Monitoring fully configured
- [ ] User manual complete
- [ ] Technical documentation complete
- [ ] API documentation complete
- [ ] Developer documentation complete
- [ ] Deployment documentation complete
- [ ] Project report written
- [ ] Presentation prepared
- [ ] Code repository organized
- [ ] All documentation reviewed

---

## Appendix A: Development Tools Checklist

### Essential Tools
- [ ] Node.js 18+
- [ ] npm or yarn
- [ ] Python 3.10+
- [ ] pip
- [ ] Git
- [ ] VS Code
- [ ] MongoDB (local or Atlas)
- [ ] MongoDB Compass
- [ ] Postman or Thunder Client

### VS Code Extensions
- [ ] ESLint
- [ ] Prettier
- [ ] Python
- [ ] MongoDB for VS Code
- [ ] GitLens
- [ ] Thunder Client
- [ ] Tailwind CSS IntelliSense
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] Auto Rename Tag
- [ ] Path Intellisense

### Optional Tools
- [ ] Docker Desktop
- [ ] Jupyter Notebook
- [ ] Anaconda
- [ ] GitHub Desktop
- [ ] Robo 3T
- [ ] DataGrip
- [ ] Figma (for UI design)

---

## Appendix B: Environment Variables Reference

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ML_API_URL=
```

### Backend (.env)
```
PORT=
NODE_ENV=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=
ML_SERVICE_URL=
OPENAI_API_KEY=
CORS_ORIGIN=
```

### ML Service (.env)
```
FLASK_PORT=
FLASK_ENV=
MODEL_PATH=
```

---

## Appendix C: Testing Checklist

### Unit Tests
- [ ] Backend models
- [ ] Backend controllers
- [ ] Backend services
- [ ] Backend utilities
- [ ] Frontend components
- [ ] Frontend services
- [ ] Frontend hooks
- [ ] ML service functions

### Integration Tests
- [ ] API endpoints
- [ ] Authentication flow
- [ ] Database operations
- [ ] External service integrations

### E2E Tests
- [ ] User registration
- [ ] User login
- [ ] Workout logging
- [ ] Meal plan generation
- [ ] Chatbot interaction
- [ ] Progress tracking

### Manual Tests
- [ ] Browser compatibility
- [ ] Responsive design
- [ ] Performance
- [ ] Security
- [ ] Accessibility

---

## Appendix D: Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Performance tested
- [ ] Security reviewed

### Deployment
- [ ] MongoDB Atlas configured
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] ML service deployed
- [ ] Environment variables set
- [ ] Database seeded
- [ ] Services integrated

### Post-Deployment
- [ ] Production tested
- [ ] Monitoring configured
- [ ] Backups configured
- [ ] SSL enabled
- [ ] Domain configured
- [ ] Analytics set up

---

## Appendix E: Project Timeline

### Recommended Schedule (18-20 Weeks)

**Weeks 1-2**: Stages 1-3 (Setup & Database)
**Weeks 3-4**: Stage 4 (Authentication)
**Week 5**: Stage 5 (User Profile)
**Week 6**: Stage 6 (Exercise Library)
**Weeks 7-8**: Stage 7 (Workout Logging)
**Weeks 9-10**: Stage 8 (ML Development)
**Week 11**: Stage 9 (ML Integration)
**Weeks 12-13**: Stage 10 (Meal Plans)
**Week 14**: Stage 11 (Chatbot)
**Week 15**: Stage 12 (Progress Tracking)
**Week 16**: Stages 13-14 (Testing)
**Week 17**: Stage 15 (UI Polish)
**Week 18**: Stage 16 (CI/CD)
**Week 19**: Stage 17 (Deployment)
**Week 20**: Stage 18 (Documentation & Presentation)

---

## Appendix F: Key Success Metrics

### Technical Metrics
- Code coverage >80%
- All tests passing
- API response time <500ms
- ML prediction accuracy (MAE, RMSE, R²)
- Zero critical security vulnerabilities
- Uptime >99%

### Feature Completeness
- User authentication ✓
- Profile management ✓
- Workout logging ✓
- ML calorie prediction ✓
- Meal plan generation ✓
- AI chatbot ✓
- Progress tracking ✓

### Quality Metrics
- Responsive on all devices
- Accessible (WCAG 2.1 Level AA)
- Professional UI/UX
- Comprehensive documentation
- Clean, maintainable code

---

## Final Notes

### Best Practices
1. **Commit often** with meaningful messages
2. **Test continuously** - don't wait until the end
3. **Document as you go** - don't delay documentation
4. **Ask for help** when stuck
5. **Keep it simple** - avoid over-engineering
6. **Backup regularly** - use Git and cloud storage
7. **Follow the stages** - don't skip steps
8. **Test on real devices** regularly

### Common Pitfalls to Avoid
- Starting ML development too late
- Ignoring testing until the end
- Hardcoding values instead of using environment variables
- Poor error handling
- Leaving documentation until final week
- Not testing on mobile devices
- Ignoring security best practices
- Overcomplicating features

### When You Get Stuck
1. Check the documentation
2. Search Stack Overflow
3. Review error messages carefully
4. Test in isolation
5. Ask your supervisor
6. Check GitHub issues
7. Consult course materials
8. Take a break and return fresh

---

## Ready to Begin?

This guide will take you from zero to a fully deployed, production-grade application. Follow each stage methodically, test thoroughly, and document everything. 

**Good luck with your project!**

Remember: You'll implement this stage by stage. Don't rush. Focus on quality over quantity.

**Start with Stage 1 when you're ready!**
