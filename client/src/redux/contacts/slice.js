export function contactsReducer(contacts = [], action) {
    if (action.type == "updateContacts") {
        return action.payload.newContact;
    }
    return contacts;
}

// ACTION CREATORS
export function updateContacts(newContact) {
    return {
        type: "updateContacts",
        payload: { newContact },
    };
}
