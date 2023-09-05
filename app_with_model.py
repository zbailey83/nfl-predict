from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json

# Load the trained Random Forest Classifier model
model = joblib.load('nfl_game_predictor_model.pkl')

app = Flask(__name__)
CORS(app)

# Health Check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

# Prediction Endpoint
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        required_features = ['schedule_season', 'schedule_week', 'schedule_playoff', 'team_home',
                             'team_away', 'team_favorite_id', 'spread_favorite', 'over_under_line',
                             'game_month', 'game_day_of_week']
        for feature in required_features:
            if feature not in data:
                return jsonify({"error": f"{feature} is required"}), 400

        # Make prediction using the trained model
        prediction = model.predict([list(data.values())])[0]
        probability = model.predict_proba([list(data.values())])[0][1]

        return jsonify({"prediction": prediction, "probability": probability}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Metadata Endpoint
@app.route('/api/metadata', methods=['GET'])
def metadata():
    metadata = {
        "teams": ["NE", "NYJ", "SF"],
        "seasons": [1999, 2000, 2021, 2022, 2023]
    }
    return jsonify(metadata), 200

if __name__ == '__main__':
    app.run(debug=True)
