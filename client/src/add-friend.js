import { useState, useEffect } from "react";

export default function handleFriendship({ user_id }) {
    const [friendState, setFriendState] = useState({ status: 5 });
    const buttonState = {
        1: "ADD FRIEND",
        2: "FRIEND REQUESTED",
        3: "ACCEPT FRIEND",
        4: "REMOVE FRIEND",
        5: "",
    };
    const obj = {
        1: "add",
        2: false,
        3: "accept",
        4: "remove",
    };
    useEffect(() => {
        fetch(`/api/friendships/status/${user_id}`)
            .then((res) => res.json())
            .then((data) => {
                checkStatus(data, user_id);
            })
            .catch((err) => console.log(err));
    }, [user_id]);
    function checkStatus(data, user_id) {
        if (data.accepted == true) {
            setFriendState({ ...data, status: 4 });
        } else if (data.accepted == false && data.sender_id == user_id) {
            setFriendState({ ...data, status: 3 });
        } else if (data.accepted == false) {
            setFriendState({ ...data, status: 2 });
        } else {
            setFriendState({ ...data, status: 1 });
        }
    }
    function handleClick() {
        if (obj[friendState.status] === false) {
            return;
        } else {
            fetch(`/api/friendships/${obj[friendState.status]}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, ...friendState }),
            })
                .then((res) => res.json())
                .then((data) => checkStatus(data, user_id))
                .catch((err) => console.log(err));
        }
    }
    return (
        <>
            <button onClick={handleClick}>
                {buttonState[friendState.status]}
            </button>
            <p></p>
        </>
    );
}
