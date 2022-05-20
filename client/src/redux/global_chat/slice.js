// setup reducer for global chat messages
export function gloablChatReducer(globalChat = [], action) {
    if (action.type == "loadChat") {
        return (globalChat = action.payload.chatMessages);
    } else if (action.type == "addChatMessage") {
        return (globalChat = [...globalChat, action.payload.chatMessages]);
    }
    return globalChat;
}

// ACTION CREATORS

// load all chat messages from the database
export function loadChat(chatMessages) {
    return {
        type: "loadChat",
        payload: { chatMessages },
    };
}

// add a new chat message to global chat
export function addChatMessage(chatMessage) {
    return {
        type: "addChatMessage",
        payload: { chatMessage },
    };
}
