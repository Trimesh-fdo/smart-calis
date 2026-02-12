# ML Service - SMART CALIS

Flask Python ML service for SMART CALIS calisthenics training platform. Provides ML-powered calorie prediction for workouts.

## Setup Instructions

### Prerequisites
- Python 3.10+
- pip
- Virtual environment (venv or virtualenv)

### Installation

#### 1. Create Virtual Environment

```bash
# Using venv
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update values:
```
FLASK_PORT=5001
FLASK_ENV=development
MODEL_PATH=./models/calorie_model.pkl
CORS_ORIGIN=http://localhost:5000
```

### Start Development Server

```bash
python app.py
```

Service runs on [http://localhost:5001](http://localhost:5001)

### Testing

```bash
pytest
pytest --cov=.
```

## Project Structure

```
ml-service/
├── models/           # Trained ML models (joblib/pickle files)
├── notebooks/        # Jupyter notebooks for model development
│   └── model_training.ipynb
├── data/             # Data files and datasets
├── app.py            # Flask application entry point
├── config.py         # Configuration
├── preprocess.py     # Data preprocessing utilities
├── predict.py        # Prediction logic
├── requirements.txt  # Python dependencies
├── .env.example      # Environment variables template
└── README.md         # This file
```

## API Endpoints

### Predictions
**POST /ml/predict-calories**

Predicts calories burned for a workout.

Request:
```json
{
  "user": {
    "age": 25,
    "weight": 75,
    "gender": "male",
    "fitness_level": "intermediate"
  },
  "workout": {
    "duration": 45,
    "exercises": [
      {"name": "push-ups", "sets": 3, "reps": 15},
      {"name": "pull-ups", "sets": 3, "reps": 10}
    ]
  }
}
```

Response:
```json
{
  "success": true,
  "predicted_calories": 275.5,
  "confidence": 0.87,
  "model_version": "v1.0"
}
```

### Health Check
**GET /ml/health**

Service health status.

Response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_version": "v1.0",
  "timestamp": "2024-02-12T10:30:00Z"
}
```

## Key Features

- ML-powered calorie prediction for calisthenics exercises
- Preprocessing and feature scaling
- Model versioning and monitoring
- CORS enabled for backend integration
- Error handling and validation
- Health check endpoint

## Model Details

The ML model predicts calories burned during calisthenics workouts based on:

**Input Features:**
- User age, weight, height, gender
- Exercise types and duration
- Fitness level
- Workout intensity
- Sets and reps

**Model Type:** Random Forest / XGBoost Regressor (determined during Stage 8)

**Performance Metrics:** (to be updated after model training)
- MAE (Mean Absolute Error)
- RMSE (Root Mean Squared Error)
- R² Score

## Model Training

Model training is handled in Jupyter Notebook during development:

```bash
jupyter notebook notebooks/model_training.ipynb
```

See Stage 8 in the main execution guide for detailed ML development steps.

## Technologies

- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model persistence
- **Flask-CORS** - CORS support

## Available Scripts

```bash
python app.py           # Start development server
pytest                  # Run tests
pytest --cov=.          # Run tests with coverage
jupyter notebook        # Start Jupyter for model development
```

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

## Integration with Backend

The backend service calls this ML service for calorie predictions:

```javascript
// backend/services/mlService.js
const response = await axios.post(
  `${process.env.ML_SERVICE_URL}/ml/predict-calories`,
  { user, workout }
);
```

## Development Workflow

1. **Data Exploration** (Stage 8)
   - Load and analyze training data
   - Identify features and patterns

2. **Model Development** (Stage 8)
   - Train multiple models
   - Compare performance
   - Tune hyperparameters

3. **Model Persistence** (Stage 8)
   - Save best model
   - Save scaler and encoders
   - Document model version

4. **Service Implementation** (Stage 9)
   - Load model in Flask app
   - Create prediction endpoint
   - Integrate with backend

5. **Testing & Validation**
   - Unit tests
   - Integration tests
   - Performance testing

## Learn More

- [Flask Documentation](https://flask.palletsprojects.com/)
- [scikit-learn Documentation](https://scikit-learn.org/)
- [pandas Documentation](https://pandas.pydata.org/)
- [Jupyter Notebook](https://jupyter.org/)

## Notes

- Model files should not be committed to Git (add to .gitignore)
- Keep model version updated
- Monitor model performance in production
- Plan for periodic retraining with new data
