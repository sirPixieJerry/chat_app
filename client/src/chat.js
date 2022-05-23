// import hooks from react
import { useEffect, useState, useRef } from "react";
// import routes from react
import { Link } from "react-router-dom";
// import components from files:
import Avatar from "./avatar";
// connect to redux
import { useDispatch, useSelector } from "react-redux";
import { loadChat, addChatMessage } from "./redux/global_chat/slice";

// connect to socket.io
import { io } from "socket.io-client";
let socket;

export default function GloabalChat() {
    let [message, setMessage] = useState("");
    const input = useRef(null);
    const lastMessage = useRef(null);
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.globalChat);
    useEffect(() => {
        if (!socket) socket = io.connect();
        socket.on("getChatHistory", ({ chatHistory }) =>
            dispatch(loadChat(chatHistory))
        );
        socket.on("storedMessage", (message) => {
            dispatch(addChatMessage(message));
            console.log(message);
        });
        return () => {
            socket.off("getChatHistory");
            socket.off("newMessage");
            socket.disconnect();
            socket = null;
        };
    }, []);
    useEffect(() => {
        input.current.focus();
        const scrollToBottom = () => {
            lastMessage.current?.scrollIntoView({ behavior: "smooth" });
        };
        scrollToBottom();
    }, [messages]);

    function handleChange(evt) {
        setMessage(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        socket.emit("newMessage", { newMessage: message });
        const input = document.getElementById("message-input");
        input.value = "";
    }
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
    }
    // function formatTimestamp(timestamp) {
    //     const date = new Date(timestamp);
    //     return `${date.toLocaleDateString()} at ${date.toLocaleTimeString}`;
    // }
    return (
        <>
            <div>
                <h3>GLOBAL CHAT</h3>
            </div>
            <div className="chat-box">
                {messages &&
                    messages.map((message) => {
                        // const timer = message.created_at;
                        // const time = formatTimestamp(timer);
                        return (
                            <div key={message.id} className="chat-message">
                                <div>
                                    <Avatar
                                        className="avatar-chat"
                                        profile_picture_url={
                                            message.profile_picture_url
                                        }
                                    />
                                </div>
                                <div>
                                    <div>
                                        <p className="chat-name">
                                            {message.first_name}{" "}
                                            {message.last_name}
                                        </p>
                                        <time>
                                            {formatDate(message.created_at)}
                                        </time>
                                    </div>
                                    <div>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <div ref={lastMessage} />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="chat"
                        placeholder="enter chat message here..."
                        id="message-input"
                        ref={input}
                        onChange={handleChange}
                    />
                    <button>SUBMIT</button>
                </form>
            </div>
        </>
    );
}
