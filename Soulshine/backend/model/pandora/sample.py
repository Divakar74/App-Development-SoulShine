from datasets import load_dataset

# Load the jokes dataset
jokes_dataset = load_dataset("Middletownbooks/joke_training")
print(jokes_dataset['train'][0])
