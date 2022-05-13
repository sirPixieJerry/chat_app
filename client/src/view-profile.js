import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Avatar from "./avatar";

export default function viewProfile() {
    const { friendId } = useParams();
    const history = useHistory();
    const { error, setError } = useState(""); // in case of error
    useEffect(() => {
        fetch(`/api/profiles/${friendId}`)
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <h1>USER PROFILE OTHER USER</h1>{" "}
            {error && <h2>user does not exist</h2>}
            <div className="profile-header">
                <Avatar
                    className="avatar-big"
                    profile_picture_url={profile_picture_url}
                />
                <div>
                    <p>
                        {first_name} {last_name}
                    </p>
                    <p>{bio}</p>
                </div>
            </div>
        </>
    );
}
