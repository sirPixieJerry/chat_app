import { Component } from "react";

export default class Logout extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(evt) {
        evt.preventDefault();
        fetch("/logout").then(location.replace("/"));
    }
    render() {
        return <button onClick={this.handleLogout}>logout</button>;
    }
}
