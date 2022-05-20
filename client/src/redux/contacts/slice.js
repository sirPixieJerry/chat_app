export function contactsReducer(contacts = [], action) {
    if (action.type == "contacts") {
        return (contacts = action.payload.contacts);
    } else if (action.type == "contacts/remove") {
        return (contacts = contacts.filter(
            (user) =>
                user.id !==
                (action.payload.contact.sender_id ||
                    action.payload.contact.recipient_id)
        ));
    } else if (action.type == "contacts/answer") {
        return (contacts = contacts.map((user) => {
            console.log(user);
            if (
                user.id == action.payload.contact.sender_id ||
                action.payload.contact.recipient_id
            ) {
                user = { ...user, accepted: true };
            }
            return user;
        }));
    }
    return contacts;
}

// ACTION CREATORS

// get all contacts and requests from database
export function getContactAndRequests(contacts) {
    return {
        type: "contacts",
        payload: { contacts },
    };
}

// remove contacts
export function removeContacts(contact) {
    return {
        type: "contacts/remove",
        payload: { contact },
    };
}

// answer request
export function answerRequest(contact) {
    return {
        type: "contacts/answer",
        payload: { contact },
    };
}
