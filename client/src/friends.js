// import hooks from react
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import components from files:
import Avatar from "./avatar";
import { useDispatch, useSelector } from "react-redux";
import {
    getContactAndRequests,
    removeContacts,
    answerRequest,
} from "./redux/contacts/slice";

// component to show friends
export default function ShowFriends({ user_id }) {
    const dispatch = useDispatch();
    const friends = useSelector((state) =>
        state.contacts.filter((user) => user.accepted)
    );
    // console.log(friends);
    const requests = useSelector((state) =>
        state.contacts.filter((user) => !user.accepted)
    );
    useEffect(() => {
        fetch("/api/friends")
            .then((res) => res.json())
            .then((data) => {
                dispatch(getContactAndRequests(data));
            });
    }, [user_id]);
    function handleRemovefriend(evt) {
        // console.log(evt.currentTarget.id);
        fetch("/api/friendships/remove", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_id: user_id,
                recipient_id: evt.currentTarget.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(removeContacts(data));
            })
            .catch((err) => console.log(err));
    }
    function handleAddfriend(evt) {
        // console.log(evt.currentTarget.id);
        fetch("/api/friendships/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_id: user_id,
                recipient_id: evt.currentTarget.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(answerRequest(data));
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <div>
                <h3>FRIENDS</h3>
                {friends &&
                    friends.map((user) => {
                        return (
                            <>
                                <Link
                                    to={`/user/${user.id}`}
                                    key={user.id}
                                    className="friend-list"
                                >
                                    <Avatar
                                        profile_picture_url={
                                            user.profile_picture_url
                                        }
                                    />
                                    <div>
                                        <p>
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleRemovefriend}
                                    id={user.id}
                                >
                                    REMOVE FRIEND
                                </button>
                            </>
                        );
                    })}
                <h3>FRIEND REQUESTS</h3>
                {requests &&
                    requests.map((user) => {
                        return (
                            <>
                                <Link
                                    to={`/user/${user.id}`}
                                    key={user.id}
                                    className="friend-list"
                                >
                                    <Avatar
                                        profile_picture_url={
                                            user.profile_picture_url
                                        }
                                    />
                                    <div>
                                        <p>
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </div>
                                </Link>
                                <button id={user.id} onClick={handleAddfriend}>
                                    ADD FRIEND
                                </button>
                            </>
                        );
                    })}
            </div>
        </>
    );
}
