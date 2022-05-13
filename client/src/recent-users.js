import { useState, useEffect } from "react";
import Avatar from "./avatar";

export default function RecentUsers() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch("/api/recent-users")
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <h3>RECENT USERS</h3>
            <div className="recent-users">
                {userData.map((user) => {
                    return (
                        <div className="recent-user" key={user.id}>
                            <Avatar
                                profile_picture_url={user.profile_picture_url}
                            />
                            <p>
                                {user.first_name} {user.first_name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
