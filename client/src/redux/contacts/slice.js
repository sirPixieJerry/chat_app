export function contactsReducer(contacts = [], action) {
    if (action.type == "getContactAndRequests") {
        return (contacts = action.payload.contactsAndRequests);
    } else if (action.type == "removeContact") {
        console.log("REMOVE");
        contacts = contacts.map((user) => {
            console.log(user);
            if (user.id === action.payload.id) {
                return {
                    ...user,
                    accepted: true,
                };
            } else {
                return user;
            }
        });
    } else if (action.type == "answerRequest") {
        console.log("ANSWER");
        contacts = contacts.map((user) => {
            if (user.id === !action.payload.id) {
                return user;
            } else {
                return;
            }
        });
    }
    return contacts;
}

// ACTION CREATORS

// get all contacts and requests from database
export function getContactAndRequests(contactsAndRequests) {
    return {
        type: "getContactAndRequests",
        payload: { contactsAndRequests },
    };
}

// remove contacts
export function removeContacts(removeContacts) {
    return {
        type: "removeContact",
        payload: { removeContacts },
    };
}

// answer request
export function answerRequest(answerRequest) {
    return {
        type: "answerRequest",
        payload: { answerRequest },
    };
}
