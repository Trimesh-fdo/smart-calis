# CalixAI

CalixAI is an AI-powered fitness and calisthenics platform designed to provide personalized workout recommendations, meal planning, progress tracking, and conversational AI assistance. 

## Project Structure

This project is a full-stack application divided into three main microservices:

- **`/frontend`**: The user interface built with Next.js and React.
- **`/backend`**: The main API server built with Node.js and Express to handle user data, authentication, and core application logic.
- **`/ml-service`**: A Python-based machine learning service that handles exercise recommendations, calorie predictions, and dataset training.

## Features

- **Personalized Workouts & Analytics**: Calisthenics-focused workout generation and tracking.
- **Meal Planning**: AI-driven meal and nutrition planning.
- **Progress Tracking**: Log your body weight and exercise progress over time.
- **AI Chatbot**: Built-in chatbot for fitness and nutrition advice.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- MongoDB (running locally or via MongoDB Atlas)

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Set up your `.env` file with your database URI and secrets.
4. Start the server: `npm run dev` or `npm start`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Set up your `.env.local` file with the backend API URL.
4. Start the development server: `npm run dev`
5. The frontend will be available at `http://localhost:3000`.

### 3. ML Service Setup
1. Navigate to the ML service directory: `cd ml-service`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the service: `python app.py`

## Jupyter Notebooks (Machine Learning)
Inside the `ml-service/notebooks/` directory, you will find the data pipeline and model training steps:
- `00_generate_dataset.ipynb` to `06_model_evaluation.ipynb`
These notebooks cover data exploration, preprocessing, calorie model training, exercise model training, and rule-based meal planning logic.
