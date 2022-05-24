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
        return `${date.toLocaleDateString()}`;
        //  @ ${date.toLocaleTimeString()}
    }
    // function formatTimestamp(timestamp) {
    //     const date = new Date(timestamp);
    //     return `${date.toLocaleDateString()} at ${date.toLocaleTimeString}`;
    // }
    return (
        <>
            <div className="chat-box">
                <div className="chat">
                    {messages &&
                        messages.map((message) => {
                            // const timer = message.created_at;
                            // const time = formatTimestamp(timer);
                            return (
                                <div key={message.id} className="chat-message">
                                    <Link to={`/user/${message.sender_id}`}>
                                        <Avatar
                                            className="avatar-chat"
                                            profile_picture_url={
                                                message.profile_picture_url
                                            }
                                        />
                                    </Link>
                                    <div>
                                        <div className="chat-name">
                                            <Link
                                                to={`/user/${message.sender_id}`}
                                            >
                                                {message.first_name}{" "}
                                                {message.last_name}
                                            </Link>
                                            <time>
                                                {`\xa0\xa0\xa0`}
                                                {formatDate(message.created_at)}
                                            </time>
                                        </div>
                                        <div>
                                            <p className="message">
                                                {message.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <div ref={lastMessage} />
                </div>

                <div className="chat-input">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="chat"
                            placeholder="message to #global chat"
                            id="message-input"
                            ref={input}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
