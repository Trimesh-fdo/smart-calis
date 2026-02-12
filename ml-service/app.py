from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configuration
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = app.config['FLASK_ENV'] == 'development'

# CORS setup
CORS(app, resources={r"/ml/*": {"origins": os.getenv('CORS_ORIGIN', 'http://localhost:5000')}})

# Health check endpoint
@app.route('/ml/health', methods=['GET'])
def health():
    return {
        'status': 'healthy',
        'service': 'Smart Calis ML Service',
        'model_loaded': False,  # Will be True after model is loaded in Stage 8
        'timestamp': __import__('datetime').datetime.utcnow().isoformat()
    }

# Placeholder for prediction endpoint (will be implemented in Stage 9)
@app.route('/ml/predict-calories', methods=['POST'])
def predict_calories():
    return {
        'success': False,
        'error': 'Model not yet loaded. Please train the model first (Stage 8).'
    }, 503

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5001))
    print(f"""
╔════════════════════════════════════════════════╗
║     Smart Calis ML Service                     ║
║     Environment: {app.config['FLASK_ENV']}                     ║
║     Server running on port: {port}                      ║
║     API available at: http://localhost:{port}/ml       ║
╚════════════════════════════════════════════════╝
    """)
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])
