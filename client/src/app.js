import { Component } from "react";
import Logout from "./logout";
// import Avatar from "./avatar";
// import AvatarUpload from ":/avatar-upload";

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("REQ DONE!");
        fetch("/api/users/me")
            .then((res) => res.json())
            .then((data) => {
                const { first_name, last_name } = data;
                this.setState({ first_name, last_name });
                console.log(this.state);
            })
            .catch((err) => console.error(err));
    }
    render() {
        return (
            <>
                <header>
                    <h1>I MIGHT BECOME A LOGO</h1>
                    <Logout />
                    {/* <Avatar /> */}
                </header>
                <main>
                    <h1>
                        Welcome back {this.state.first_name}{" "}
                        {this.state.last_name}
                    </h1>
                </main>
                <footer>{/* <AvatarUpload /> */}</footer>
            </>
        );
    }
}
