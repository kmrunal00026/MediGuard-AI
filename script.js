function getResponse(message) {
    const text = message.toLowerCase();
    if (
    text.includes("chest pain") ||
    text.includes("difficulty breathing") ||
    text.includes("can't breathe") ||
    text.includes("unconscious")
) {
    return "⚠️ EMERGENCY ALERT: These symptoms may need immediate medical attention. Contact local emergency services (India: 112) or go to the nearest emergency department now.";
}

    if (text.includes("headache")) {
        return "Headache can have many causes. Please consult a healthcare professional if it persists or is severe.";
    }

    if (text.includes("fever")) {
        return "Fever can have different causes. Monitor your symptoms and consult a healthcare professional.";
    }

    if (text.includes("cough")) {
        return "For a persistent or worsening cough, seek advice from a healthcare professional.";
    }

    return "Thank you for sharing. I cannot diagnose medical conditions. Please consult a qualified healthcare professional for medical advice.";
}
function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") {
        alert("Please enter your symptoms.");
        return;
    }

    if (message.length > 500) {
        alert("Please enter a message within 500 characters.");
        return;
    }

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = "Connecting to MediGuard AI...";

fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
})
.then(response => response.json())
.then(data => {
    botMessage.textContent = data.response || data.error;
})
.catch(error => {
    botMessage.textContent =
        "Unable to connect to Python server. Please try again.";
    console.error(error);
});
    chatBox.appendChild(botMessage);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
function clearChat() {
    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML = `
        <div class="bot-message">
            Hello! Welcome to MediGuard AI.
            How can I help you today?
        </div>
    `;
}