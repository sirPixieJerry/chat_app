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
import { socket } from "./socket";
// import { io } from "socket.io-client";
// let socket;

// component to show online users
export default function ShowUsersOnline({ user_id }) {
    console.log(user_id);
    const users = useSelector((state) => state.usersOnline);
    const dispatch = useDispatch();
    useEffect(() => {
        // if (!socket) socket = io.connect();
        socket.on("getUsersOnline", (rows) => {
            console.log("getUsersOnline :", rows);
            dispatch(loadUsersOnline(rows));
        });
        socket.on("getNewUsersOnline", ({ onlineUser }) => {
            console.log("getNewUsersOnline :", onlineUser);
            if (onlineUser.user_id !== user_id) {
                dispatch(newUsersOnline(onlineUser));
            } else {
                return;
            }
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
            // socket = null;
        };
    }, [user_id]);
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
