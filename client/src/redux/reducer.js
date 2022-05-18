import { combineReducers } from "redux";
import { contactsReducer } from "./contacts/slice.js";

const rootReducer = combineReducers({
    contacts: contactsReducer,
});

export default rootReducer;
