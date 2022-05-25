// import hooks from react
import { useEffect } from "react";
// import from socket.io
import { io } from "socket.io-client";

export let socket;

export default function Socket() {
    useEffect(() => {
        if (!socket) socket = io.connect();
    }, []);
    return <></>;
}
