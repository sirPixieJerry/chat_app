// import hooks from react
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import components from files:
import Avatar from "./avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateContacts } from "./redux/contacts/slice";

// component to show friends
export default function ShowFriends({ user_id }) {
    const dispatch = useDispatch();
    const friends = useSelector((state) =>
        state.contacts.filter((user) => user.accepted)
    );
    const requests = useSelector((state) =>
        state.contacts.filter((user) => !user.accepted)
    );
    console.log(friends);
    useEffect(() => {
        fetch("/api/friends")
            .then((res) => res.json())
            .then((data) => {
                dispatch(updateContacts(data));
            });
    }, [user_id]);
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
                                    id={user.id}
                                >
                                    <Avatar
                                        profile_picture_url={
                                            user.profile_picture_url
                                        }
                                    />
                                    <p>
                                        {user.first_name} {user.last_name}
                                    </p>
                                    <button>REMOVE FRIEND</button>
                                </Link>
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
                                    id={user.id}
                                >
                                    <Avatar
                                        profile_picture_url={
                                            user.profile_picture_url
                                        }
                                    />
                                    <p>
                                        {user.first_name} {user.last_name}
                                    </p>
                                    <button>ADD FRIEND</button>
                                </Link>
                            </>
                        );
                    })}
            </div>
        </>
    );
}
