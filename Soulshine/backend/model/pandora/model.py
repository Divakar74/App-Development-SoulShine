import json
import pickle
import numpy as np
import warnings
warnings.filterwarnings("ignore")
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Embedding, GlobalAveragePooling1D
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
from datasets import load_dataset

# Function to train and save the model
def train_and_save_model():
    # Load the JSON file
    with open('intents.json') as file:
        data = json.load(file)

    training_sentences = []
    training_labels = []
    labels = []
    responses = []

    # Process the intents JSON file
    for intent in data['intents']:
        for pattern in intent['patterns']:
            training_sentences.append(pattern)
            training_labels.append(intent['tag'])
        responses.append(intent['responses'])

        if intent['tag'] not in labels:
            labels.append(intent['tag'])

    # Load jokes dataset from Hugging Face
    jokes_dataset = load_dataset("Middletownbooks/joke_training")
    jokes_data = jokes_dataset['train']

    # Add jokes to training data
    for joke in jokes_data:
        # Extract text from the 'text' field and combine instruction and response
        joke_data = json.loads(joke['text'])
        joke_text = joke_data['response']  # Get the joke response

        # Append the joke text and assign the label 'joke'
        training_sentences.append(joke_text)
        training_labels.append('joke')

    if 'joke' not in labels:
        labels.append('joke')
        responses.append(["That's a funny joke!", "Good one!", "Haha, that's hilarious!", "You have a great sense of humor!"])

    num_classes = len(labels)

    lbl_encoder = LabelEncoder()
    lbl_encoder.fit(training_labels)
    training_labels = lbl_encoder.transform(training_labels)

    # Text preprocessing
    vocab_size = 1000
    embedding_dim = 16
    max_len = 20
    oov_token = "<OOV>"

    tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_token)
    tokenizer.fit_on_texts(training_sentences)
    sequences = tokenizer.texts_to_sequences(training_sentences)
    padded_sequences = pad_sequences(sequences, truncating='post', maxlen=max_len)
    #Deep learning Sequential
    # Model
    model = Sequential()
    model.add(Embedding(vocab_size, embedding_dim, input_length=max_len))
    model.add(GlobalAveragePooling1D())
    model.add(Dense(16, activation='relu'))
    model.add(Dense(16, activation='relu'))
    model.add(Dense(num_classes, activation='softmax'))

    model.compile(loss='sparse_categorical_crossentropy', 
                  optimizer='adam', metrics=['accuracy'])

    model.summary()

    epochs = 500
    history = model.fit(padded_sequences, np.array(training_labels), epochs=epochs)

    # Save the trained model
    model.save('chat-model.h5')

    # Save the fitted tokenizer
    with open('tokenizer.pickle', 'wb') as handle:
        pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

    # Save the fitted label encoder
    with open('label_encoder.pickle', 'wb') as ecn_file:
        pickle.dump(lbl_encoder, ecn_file, protocol=pickle.HIGHEST_PROTOCOL)

# Function to load the model and dependencies
def load_model_and_dependencies():
    # Load the model
    model = load_model('chat-model.h5')

    # Load the tokenizer
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # Load the label encoder
    with open('label_encoder.pickle', 'rb') as ecn_file:
        lbl_encoder = pickle.load(ecn_file)

    return model, tokenizer, lbl_encoder

# Function to make predictionsaa
def predict_class(model, tokenizer, lbl_encoder, text):
    max_len = 20
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequences = pad_sequences(sequences, truncating='post', maxlen=max_len)
    prediction = model.predict(padded_sequences)
    predicted_class = lbl_encoder.inverse_transform([np.argmax(prediction)])
    return predicted_class[0]

# Uncomment the following line to train and save the model again
# train_and_save_model()

# Load the model and dependencies
model, tokenizer, lbl_encoder = load_model_and_dependencies()

# Test the chatbot
user_input = "Hello"
predicted_class = predict_class(model, tokenizer, lbl_encoder, user_input)
print(f"Predicted class for '{user_input}': {predicted_class}")
