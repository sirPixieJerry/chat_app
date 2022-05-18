// import hooks from react
import { useState, useEffect } from "react";
// import components from files:
import Avatar from "./avatar";

// component to show friends
export default function ShowFriends({ user_id }) {
    //console.log("USER ID: ", user_id);
    useEffect(() => {
        fetch("/api/friends")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, [user_id]);
    return (
        <>
            <Avatar />
            <p>first_name last_name</p>
        </>
    );
}
