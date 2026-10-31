from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_response(message):
    text = message.lower()

    if "chest pain" in text or "can't breathe" in text or "difficulty breathing" in text:
        return "Emergency warning: Seek immediate medical attention. In India, call 112."

    elif "headache" in text:
        return "Headache can have many causes. Consult a healthcare professional if it is severe or persistent."

    elif "fever" in text:
        return "Fever can have different causes. Monitor your symptoms and consult a healthcare professional."

    elif "cough" in text:
        return "For a persistent or worsening cough, seek advice from a healthcare professional."

    return "Thank you for sharing. This demo cannot diagnose medical conditions. Please consult a qualified healthcare professional."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"error": "Message cannot be empty"}), 400

    return jsonify({"response": get_response(message)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)