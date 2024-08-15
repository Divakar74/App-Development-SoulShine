import json
import numpy as np
import warnings
warnings.filterwarnings("ignore")
from tensorflow import keras
from sklearn.preprocessing import LabelEncoder

import colorama
colorama.init()
from colorama import Fore, Style

import random
import pickle

# Load intents from JSON file
with open('intents.json') as file:
    data = json.load(file)

def chat():
    # Load the trained model
    model = keras.models.load_model('chat-model.h5')

    # Load tokenizer object
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # Load label encoder object
    with open('label_encoder.pickle', 'rb') as enc:
        lbl_encoder = pickle.load(enc)

    # Parameters
    max_len = 20

    while True:
        print(Fore.LIGHTBLUE_EX + 'User: ' + Style.RESET_ALL, end="")
        inp = input()
        if inp.lower() == 'quit':
            print(Fore.GREEN + 'Pandora: ' + Style.RESET_ALL, "Take care. See you soon.")
            break

        # Predict the intent
        result = model.predict(keras.preprocessing.sequence.pad_sequences(tokenizer.texts_to_sequences([inp]), truncating='post', maxlen=max_len))
        tag = lbl_encoder.inverse_transform([np.argmax(result)])

        # Find the response based on the predicted intent
        response_found = False
        for i in data['intents']:
            if i['tag'] == tag[0]:
                print(Fore.GREEN + 'Pandora: ' + Style.RESET_ALL, np.random.choice(i['responses']))
                response_found = True
                break
        
        if not response_found:
            print(Fore.GREEN + 'Pandora: ' + Style.RESET_ALL, "I'm not sure how to respond to that. Can you please rephrase?")

print(Fore.YELLOW + 'Start talking with Pandora, your Personal Therapeutic AI Assistant. (Type quit to stop talking)' + Style.RESET_ALL)
chat()
