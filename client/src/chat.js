// import hooks from react
import { useEffect } from "react";
// import routes from react
import { Link } from "react-router-dom";
// import components from files:
import Avatar from "./avatar";
// connect to redux
import { useDispatch, useSelector } from "react-redux";
import { loadChat, addChatMessage } from "./redux/global_chat/slice";

export default function GloabalChat(user_id) {
    useEffect(() => {
        fetch("api/chat")
            .then((res) => res.json())
            .then((data) => {
                useDispatch(loadChat(data));
                console.log({ data });
            })
            .catch((err) => console.log(err));
    });
    function handleSubmit(evt) {
        evt.preventDefault();
    }
    return (
        <>
            <div>
                <h3>GLOBAL CHAT</h3>
            </div>
            <div>{/* CHAT MESSAGES HERE */}</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input />
                    <button>SUBMIT</button>
                </form>
            </div>
        </>
    );
}
