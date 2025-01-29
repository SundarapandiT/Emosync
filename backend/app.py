from flask import Flask, request, jsonify
from flask_cors import CORS
from fer import FER
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize FER detector
detector = FER()

@app.route('/')
def home():
    return "Emotion Detection Server is running!"

@app.route('/predict', methods=['POST'])
def predict_emotion():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400

        # Read the uploaded image
        image_file = request.files['image']
        image = Image.open(io.BytesIO(image_file.read()))

        # Convert image to numpy array
        image_np = np.array(image)

        # Detect emotions
        emotions = detector.detect_emotions(image_np)
        
        if not emotions:
            return jsonify({"error": "No face detected"}), 400

        # Get the highest probability emotion
        detected_emotion = max(emotions[0]['emotions'], key=emotions[0]['emotions'].get)
        
        return jsonify({"emotion": detected_emotion})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
