import { Component } from "react";
import Logout from "./logout";
import Avatar from "./avatar";
import AvatarUpload from "./avatar-upload";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
        // methods that change values in state needs to be bind inside the constructor
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }
    componentDidMount() {
        fetch("/api/users/me")
            .then((res) => res.json())
            .then((data) => {
                const { first_name, last_name, profile_picture_url } = data;
                this.setState({ first_name, last_name, profile_picture_url });
            })
            .catch((err) => console.error(err));
    }
    onProfileClick() {
        // change the state by using .setState and the object({statename: value})!!!
        this.setState({ showModal: true });
        console.log("OPEN!");
    }
    closeModal() {
        this.setState({ showModal: false });
        console.log("CLOSE!");
    }
    onUpload() {
        this.setState({ showModal: false });
    }
    render() {
        if (!this.state.first_name) {
            return <div>loading...</div>; // change to a loading modal
        }
        return (
            <>
                <header>
                    <h1>I MIGHT BECOME A LOGO</h1>
                    <Logout />
                    <Avatar
                        profile_picture_url={this.state.profile_picture_url}
                        onProfileClick={this.onProfileClick}
                    />
                </header>
                <main>
                    <h1>
                        Welcome back {this.state.first_name}{" "}
                        {this.state.last_name}
                    </h1>
                </main>
                <footer>
                    {this.state.showModal && (
                        <AvatarUpload closeModal={this.closeModal} />
                    )}
                </footer>
            </>
        );
    }
}
