import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function findPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        if (search) {
            fetch(`/api/users/${search}`)
                .then((res) => res.json())
                .then((userData) => {
                    if (!abort) {
                        setUsers(userData);
                    }
                })
                .catch((err) => console.log(err));
            () => (abort = true);
        } else {
            setUsers(false);
        }
    }, [search]);
    return (
        <>
            <div className="usersearch">
                <input
                    onChange={(evt) => setSearch(evt.target.value)}
                    placeholder="Search Users"
                />
                {users && (
                    <div className="results">
                        {users.map((user) => {
                            return (
                                <Link
                                    to={`/user/${user.id}`}
                                    key={user.id}
                                    className="search-results"
                                >
                                    <img
                                        className="avatar-user-search"
                                        src={user.profile_picture_url}
                                    />
                                    <p>
                                        {user.first_name} {user.last_name}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
