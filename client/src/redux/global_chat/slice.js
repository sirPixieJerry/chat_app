// setup reducer for global chat messages
export function globalChatReducer(globalChat = [], action) {
    if (action.type == "loadChat") {
        return (globalChat = action.payload.chatMessages);
    } else if (action.type == "addChatMessage") {
        return (globalChat = [...globalChat, action.payload.newChatMessage]);
    }
    return globalChat;
}

// ACTION CREATORS

// load all chat messages from the database
export function loadChat(chatMessages) {
    chatMessages.reverse();
    return {
        type: "loadChat",
        payload: { chatMessages },
    };
}

// add a new chat message to global chat
export function addChatMessage(newChatMessage) {
    return {
        type: "addChatMessage",
        payload: { newChatMessage },
    };
}
