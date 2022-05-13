import { useState, useEffect } from "react";

export default function findPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        fetch(`/api/users/${search}`)
            .then((res) => res.json())
            .then((userData) => {
                if (!abort) {
                    setUsers(userData);
                }
            })
            .catch((err) => console.log(err));
        () => (abort = true);
    }, [search]);
    return (
        <>
            <div className="usersearch">
                <input
                    onChange={(evt) => setSearch(evt.target.value)}
                    placeholder="Search Users"
                />
                <div className="results">
                    {users.map((user) => {
                        return (
                            <div className="search-results" key={user.id}>
                                <img
                                    className="avatar-user-search"
                                    src={user.profile_picture_url}
                                />
                                <p>
                                    {user.first_name} {user.first_name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
