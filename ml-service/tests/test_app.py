"""
ML Service Tests
"""

import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_endpoint(client):
    """Test the health check endpoint"""
    response = client.get('/ml/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'

def test_predict_endpoint_no_model(client):
    """Test prediction endpoint when model is not loaded"""
    response = client.post('/ml/predict-calories', json={
        'user': {'age': 25, 'weight': 70},
        'workout': {'duration': 30}
    })
    assert response.status_code == 503
    assert 'not yet loaded' in response.json['error']
