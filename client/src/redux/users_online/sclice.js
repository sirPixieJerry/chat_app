// setup reducer for online users
export function usersOnlineReducer(usersOnline = [], action) {
    if (action.type == "loadUsersOnline") {
        return (usersOnline = [...usersOnline]);
    } else if (action.type == "newUsersOnline") {
        return (usersOnline = [...usersOnline, action.payload.newUsersOnline]);
    } else if (action.type == "removeUsersOffine") {
        return (usersOnline = usersOnline.filter(
            (user) => user.user_id !== action.payload.usersOffine
        ));
    }
    return usersOnline;
}

// ACTION CREATORS

// load all chat messages from the database
export function loadUsersOnline(usersOnline) {
    return {
        type: "loadUsersOnline",
        payload: { usersOnline },
    };
}

// add a new chat message to global chat
export function newUsersOnline(newUsersOnline) {
    return {
        type: "newUsersOnline",
        payload: { newUsersOnline },
    };
}

// remove offline users from online user list
export function removeUsersOffine(usersOffine) {
    return {
        type: "removeUsersOffine",
        payload: { usersOffine },
    };
}
