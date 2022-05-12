import { useState } from "react";
import { useEffect } from "react";

export default function findPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(search);
        let abort = false;
        fetch(`/api/users/${search}`)
            .then((res) => res.json())
            .then((userData) => {
                console.log("HI!", userData);
                if (!abort) {
                    setUsers(userData);
                }
            })
            .catch((err) => console.log(err));
        () => (abort = true);
    }, [search]);

    console.log("USERS: ", users);
    return (
        <>
            <h1>FIND USERS COMPONENT</h1>
            <input
                onChange={(evt) => setSearch(evt.target.value)}
                placeholder="Search Users"
            />
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <img src={user.profile_picture_url} />
                        {user.first_name} {user.first_name}
                    </div>
                );
            })}
        </>
    );
}
