import { useState } from "react";
import { useEffect } from "react";

export default function findPeople({}) {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        fetch(`/api/users/${search}`)
            .then((res) => res.json())
            .then((userData) => {
                if (!abort) {
                    users(userData);
                }
            })
            .catch((err) => console.log(err));
        () => (abort = true);
    }, [search]);
    return (
        <>
            <h1>FIND USERS COMPONENT</h1>
            <input
                onChange={(evt) => setSearch(evt.target.value)}
                placeholder="Search Users"
            />
            {users.map((user) => {
                return <li key={user.name}>{user}</li>;
            })}
        </>
    );
}
