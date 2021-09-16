const nameInput = document.getElementById("myName");
const myMessage = document.getElementById("myMessage");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chat");
/*
function updateMessagesInChatBox() {
        
        fetchMessages(); 

        What loop to use?
        formatMessages();
        updateChatBox();
}
*/

const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
function fetchMessages() {
    return fetch(serverURL).then( response => response.json())
}

async function updateMessages() { 
     // Fetch Messages
    const messages = await fetchMessages();
    
     // Loop over the messages. Inside the loop we will
         // get each message
         // format it
         // add it to the chatbox
    for (i = 0; i < messages.length; i++) {
        formatMessage(messages[i]); //where you are in  array of json objects

    }
    
}

function formatMessage(message, myName) {
    const time = new Date(message.timestamp);
    const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

    if (myName === message.sender) {
        return `
        <div class="mine messages">
            <div class="message">
                ${message.text} 
            </div>
            <div class="sender-info">
                ${formattedTime}
            </div>
        </div>
        `
    } else {
        return `
            <div class="yours messages">
                <div class="message">
                    ${message.text}
                </div>
                <div class="sender-info">
                    ${message.sender} ${formattedTime}
                </div>
            </div>
        `
    }
}
// ${} =this evaluates what's in the brackets and concatenates it into the string
// ^ it's going to the json message object and retreiving the text property

/* async function updateMessages() {
    const messages = await fetchMessages();
    
    let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
} */

updateMessages()
setInterval(updateMessages, 10000);
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages (username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date()
    }

    $.post(serverURL, newMessage);
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
    sendButtonClickEvent.preventDefault();
    const sender = nameInput.value;
    const message = myMessage.value;

    sendMessages(sender,message);
    myMessage.value = "";
});

