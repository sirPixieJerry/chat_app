import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Avatar from "./avatar";
import AddFriend from "./add-friend";
import { Link } from "react-router-dom";

export default function User() {
    const [user, setUser] = useState([]);
    const { user_id } = useParams();
    const history = useHistory();
    const [error, setError] = useState(""); // in case of error
    useEffect(() => {
        if (!user_id) {
            return;
        }
        fetch(`/users/${user_id}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err));
    }, [user_id]);
    return (
        <>
            <div className="blackbox">
                <div className="profile">
                    <Link to="/">
                        <div className="esc">
                            <img src="/images/esc.png" />
                        </div>
                    </Link>
                    {error && <h2>user does not exist</h2>}
                    <div className="profile-header"></div>
                    <div className="profile-main">
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
                        {<AddFriend user_id={user_id} />}
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    );
}
