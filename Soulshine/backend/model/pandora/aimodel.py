import random

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

def get_motivational_quote():
    quotes = [
        "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "The best way to predict the future is to create it.",
        "Believe you can and you're halfway there.",
        "It's not whether you get knocked down, it's whether you get up."
    ]
    return random.choice(quotes)
