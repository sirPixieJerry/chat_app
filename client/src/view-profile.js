import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Avatar from "./avatar";

export default function User() {
    const [user, setUser] = useState([]);
    const { user_id } = useParams();
    console.log("PARM:", user_id);
    const history = useHistory();
    const { error, setError } = useState(""); // in case of error
    useEffect(() => {
        fetch(`/users/${user_id}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <h1>USER PROFILE OTHER USER</h1>{" "}
            {error && <h2>user does not exist</h2>}
            <div className="profile-header">
                <Avatar
                    className="avatar-big"
                    profile_picture_url={user.profile_picture_url}
                />
                <div>
                    <p>
                        {user.first_name} {user.last_name}
                    </p>
                    <p>{user.bio}</p>
                </div>
            </div>
        </>
    );
}
