import { useState, useEffect } from "react";

export default function handleFriendship({ user_id }) {
    const [friendState, setFriendState] = useState({ status: 4 });
    const recentState = new Map([
        ["ADD FRIEND", "add"],
        ["FRIEND REQUESTED", false],
        ["ACCEPT FRIEND", "accept"],
        ["REMOVE FRIEND", "remove"],
        ["", ""],
    ]);
    const buttonState = [...recentState.keys()];
    const fetchState = [...recentState.values()];
    const buttonText = buttonState[friendState.status] || "";
    useEffect(() => {
        fetch(`/api/friendships/status/${user_id}`)
            .then((res) => res.json())
            .then((data) => {
                checkStatus(data, user_id);
            })
            .catch((err) => console.log(err));
    }, [user_id]);
    function handleClick() {
        if (fetchState[friendState.status] === false) {
            return;
        } else {
            fetch(`/api/friendships/${fetchState[friendState.status]}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, ...friendState }),
            })
                .then((res) => res.json())
                .then((data) => checkStatus(data, user_id))
                .catch((err) => console.log(err));
        }
    }
    function checkStatus(data, user_id) {
        if (data.accepted == true) {
            setFriendState({ ...data, status: 3 });
        } else if (data.accepted == false && data.sender_id == user_id) {
            setFriendState({ ...data, status: 2 });
        } else if (data.accepted == false) {
            setFriendState({ ...data, status: 1 });
        } else {
            setFriendState({ ...data, status: 0 });
        }
    }
    return <button onClick={handleClick}>{buttonText}</button>;
}
