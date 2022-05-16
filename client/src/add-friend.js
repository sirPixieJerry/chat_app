import { useState, useEffect } from "react";

export default function handleFriendship({ user_id }) {
    const [friendState, setFriendState] = useState();
    const [buttonState, setButtonState] = useState({ status: "ADD FRIEND" });
    useEffect(() => {
        fetch(`/api/friendships/status/${user_id}`)
            .then((res) => res.json())
            .then((data) => {
                setFriendState(data);
                if (data.accepted == true) {
                    setButtonState({ status: "REMOVE FRIEND" });
                } else if (data.accepted == false) {
                    setButtonState({ status: "REQUESTED" });
                } else {
                    setButtonState({ status: "ADD FRIEND" });
                }
            })
            .catch((err) => console.log(err));
    }, [user_id, friendState]);
    function handleClick() {
        if (buttonState.status === "ADD FRIEND") {
            fetch("/api/friendships/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id }),
            })
                .then((res) => res.json())
                .then((data) => setFriendState(data))
                .catch((err) => console.log(err));
        }
    }
    return (
        <>
            <button onClick={handleClick}>{buttonState.status}</button>
            <p></p>
        </>
    );
}
