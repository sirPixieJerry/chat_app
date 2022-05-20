import { combineReducers } from "redux";
import { contactsReducer } from "./contacts/slice.js";
import { globalChatReducer } from "./global_chat/slice.js";

const rootReducer = combineReducers({
    contacts: contactsReducer,
    globalChat: globalChatReducer,
});

export default rootReducer;
