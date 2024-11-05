

const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user_input');
const sendButton = document.getElementById('send_button');

sendButton.addEventListener('click', sendMessage);
let var1 = 'AIzaSyC2jb';
let var2 = 'FRs7rP6gO7cXc-ePS';
let var3 = 'FrwfsAvWVg_0';
const apiKey = var1+var2+var3

function sendMessage() {
    const userMessage = userInput.value;
    displayMessage('user', userMessage);
    userInput.value = '';

    fetchGeminiResponse(userMessage)
        .then(response => {
            displayMessage('gemini', response);
        })
        .catch(error => {
            console.error('Error fetching response:', error);
            displayMessage('gemini', 'Sorry, there was an error processing your request.');
        });
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender, 'chat-bubble'); // Add classes for styling and identification
    messageElement.innerHTML = `<p>${message}</p>`; // Wrap the message in a paragraph
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}

async function fetchGeminiResponse(message) {
    // Replace with your actual Gemini API call
    const requestBody = {"contents":[{"parts":[{"text":message}]}]}
  
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    const responseText = data.candidates[0].content.parts[0].text; 
    return responseText;// Assuming the API returns a 'response' field
  
}
