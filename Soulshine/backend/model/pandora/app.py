from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import numpy as np
import pickle
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.sequence import pad_sequences
import random

app = Flask(__name__)
CORS(app)  # To handle CORS issues

# Load the trained model
model = load_model('chat-model.h5')

# Load tokenizer object
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Load label encoder object
with open('label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

# Load intents file
with open('intents.json') as file:
    data = json.load(file)

# Parameters
max_len = 20

# Function to generate motivational quotes
def get_motivational_quote():
    quotes = [
        "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "The best way to predict the future is to create it.",
        "Believe you can and you're halfway there.",
        "It's not whether you get knocked down, it's whether you get up."
    ]
    return random.choice(quotes)

# Function to generate advice based on user responses
def generate_advice(responses):
    advice = ""
    if responses['anxious'] in ['Often', 'Always']:
        advice += "It's important to manage anxiety. Consider mindfulness practices or seeking professional help.\n"
    if responses['sleep'] in ['Very Poor', 'Poor']:
        advice += "Poor sleep can impact your overall well-being. Try establishing a regular sleep routine or consulting a sleep specialist.\n"
    if responses['sad'] in ['Often', 'Always']:
        advice += "Feeling sad frequently might be a sign of depression. Speaking with a mental health professional could be beneficial.\n"
    if responses['concentration'] in ['Often', 'Always']:
        advice += "Difficulty concentrating can be challenging. Try to minimize distractions and consider professional guidance if needed.\n"
    return advice

@app.route('/predict', methods=['POST'])
def predict():
    message = request.json['message']
    result = model.predict(pad_sequences(tokenizer.texts_to_sequences([message]), truncating='post', maxlen=max_len))
    tag = lbl_encoder.inverse_transform([np.argmax(result)])

    response = "I don't understand!"
    for i in data['intents']:
        if i['tag'] == tag[0]:
            response = np.random.choice(i['responses'])
            break

    return jsonify({'response': response})

@app.route('/api/get-report', methods=['POST'])
def get_report():
    data = request.json
    responses = {
        'anxious': data.get('anxious', ''),
        'sleep': data.get('sleep', ''),
        'sad': data.get('sad', ''),
        'concentration': data.get('concentration', '')
    }
    advice = generate_advice(responses)
    quote = get_motivational_quote()
    return jsonify({
        'advice': advice,
        'quote': quote
    })

if __name__ == '__main__':
    app.run(debug=True)

