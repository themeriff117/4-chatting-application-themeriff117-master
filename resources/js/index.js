const nameInput = document.getElementById("myName");
const myMessage = document.getElementById("myMessage");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chat");

function updateMessagesInChatBox() {
    // Fetch Messages
     // Loop over the messages. Inside the loop we will
         // get each message
         // format it
         // add it to the chatbox
        fetchMessages();
        formatMessages();
        updateChatBox();
}