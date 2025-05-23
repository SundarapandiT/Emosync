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


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import io
# from utils import preprocess_image

# app = Flask(__name__)

# # Enable CORS all
# CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# # Load your trained emotion detection model
# model = tf.keras.models.load_model("emotion_detection_model.h5")

# # Emotion labels (ensure they correspond to your model's output)
# emotion_map = {
#     0: "Angry", 
#     1: "Disgust", 
#     2: "Fear", 
#     3: "Happy", 
#     4: "Sad", 
#     5: "Surprise", 
#     6: "Neutral"
# }

# @app.route('/')
# def home():
#     return "Emotion Detection Server is running!"

# @app.route('/predict', methods=['POST'])
# def predict_emotion():
#     try:
#         if 'image' not in request.files:
#             return jsonify({"error": "No image provided"}), 400

#         # Read the uploaded image
#         image_file = request.files['image']
#         image = Image.open(io.BytesIO(image_file.read()))

#         # Preprocess the image before feeding into the model
#         processed_image = preprocess_image(image)

#         # Predict emotion
#         predictions = model.predict(np.expand_dims(processed_image, axis=0))  # Add batch dimension
#         emotion_index = np.argmax(predictions)  # Get the index of the most probable emotion
#         detected_emotion = emotion_map.get(emotion_index, "unknown")  # Map index to emotion label

#         return jsonify({"emotion": detected_emotion})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)


