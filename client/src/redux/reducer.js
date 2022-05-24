import { combineReducers } from "redux";
import { contactsReducer } from "./contacts/slice.js";
import { globalChatReducer } from "./global_chat/slice.js";
import { usersOnlineReducer } from "./users_online/sclice.js";

const rootReducer = combineReducers({
    contacts: contactsReducer,
    globalChat: globalChatReducer,
    usersOnline: usersOnlineReducer,
});

export default rootReducer;
