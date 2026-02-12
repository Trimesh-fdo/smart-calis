"""
ML Service Utility Functions
"""

import numpy as np
from typing import Dict, List, Any

def preprocess_features(user_data: Dict[str, Any], workout_data: Dict[str, Any]) -> List[float]:
    """
    Preprocess user and workout data into features for ML model.
    
    Args:
        user_data: Dictionary with user profile information
        workout_data: Dictionary with workout information
    
    Returns:
        List of preprocessed features
    
    Note: This is a placeholder. Actual preprocessing will be implemented in Stage 8.
    """
    # Placeholder features - will be updated after model training
    features = []
    
    # User features
    features.append(float(user_data.get('age', 25)))
    features.append(float(user_data.get('weight', 70)))
    features.append(float(user_data.get('height', 175)))
    
    # Workout features
    features.append(float(workout_data.get('duration', 30)))
    features.append(float(workout_data.get('intensity', 5)))
    
    return features

def validate_input(data: Dict[str, Any]) -> tuple[bool, str]:
    """
    Validate input data for prediction.
    
    Args:
        data: Input data to validate
    
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not isinstance(data, dict):
        return False, 'Input must be a JSON object'
    
    if 'user' not in data or 'workout' not in data:
        return False, 'Input must contain "user" and "workout" objects'
    
    user = data.get('user', {})
    if not isinstance(user, dict):
        return False, '"user" must be an object'
    
    workout = data.get('workout', {})
    if not isinstance(workout, dict):
        return False, '"workout" must be an object'
    
    return True, ''

def round_prediction(value: float, decimals: int = 1) -> float:
    """Round prediction to specified decimals."""
    return round(value, decimals)
