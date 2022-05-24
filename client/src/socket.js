// import hooks from react
import { useEffect, useState, useRef } from "react";
// import from socket.io
import { io } from "socket.io-client";
// connect to redux
import { useDispatch, useSelector } from "react-redux";
import { loadChat, addChatMessage } from "./redux/global_chat/slice";

export let socket;

export default function Socket() {
    useEffect(() => {
        if (!socket) socket = io.connect();
        // socket.on("getChatHistory", ({ chatHistory }) =>
        //     useDispatch(loadChat(chatHistory))
        // );
    }, []);
    return <></>;
    // if (!socket) {
    //     socket = io.connect();

    //     socket.on("getChatHistory", ({ chatHistory }) =>
    //         useDispatch(loadChat(chatHistory))
    //     );
    //     //all our dispatches of actions will go here
    //     socket.on("chatHistory", (msgs) => store.dispatch(chatHistory(msgs)));
    //     socket.on("newMsgPosted", (msgPosted) =>
    //         store.dispatch(chatMessagePosted(msgPosted))
    //     );
    //     socket.on("NewFriendRequest", (reqObj) =>
    //         store.dispatch(newRequest(reqObj))
    //     );
    //     socket.on("onlineUsers", (users) => store.dispatch(onlineUsers(users)));
    //     socket.on("userDisconnected", (id) =>
    //         store.dispatch(disconnectUser(id))
    //     );
    //     }
    //     return () => {
    //         socket.off("getChatHistory");
    //         socket.disconnect();
    //         socket = null;
    //     };
}
