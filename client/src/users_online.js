// import from react
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import components from files:
import Avatar from "./avatar";
// connect to redux
import { useDispatch, useSelector } from "react-redux";
import {
    loadUsersOnline,
    newUsersOnline,
    removeUsersOffine,
} from "./redux/users_online/sclice";

// connect to socket.io
import { io } from "socket.io-client";
let socket;

// component to show online users
export default function ShowUsersOnline() {
    const users = useSelector((state) => state.usersOnline);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!socket) socket = io.connect();
        socket.on("getUsersOnline", () => {
            dispatch(loadUsersOnline());
        });
        socket.on("getNewUsersOnline", ({ onlineUser }) => {
            dispatch(newUsersOnline(onlineUser));
        });
        // ✅
        socket.on("removeOlineUser", ({ offlineUsers }) => {
            dispatch(removeUsersOffine(offlineUsers));
        });
        return () => {
            socket.off("getUsersOnline");
            socket.off("getNewUsersOnline");
            socket.off("removeOlineUser");
            socket.disconnect();
            socket = null;
        };
    }, []);
    return (
        <>
            <div className="users-online">USERS ONLINE</div>
            {users &&
                users.map((user) => {
                    return (
                        <div className="user-online" key={user.user_id}>
                            <Avatar
                                profile_picture_url={user.profile_picture_url}
                            />
                            <p>
                                {user.first_name} {user.last_name}
                            </p>
                        </div>
                    );
                })}
        </>
    );
}
