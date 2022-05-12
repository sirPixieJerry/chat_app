// import Component from react:
import { Component } from "react";
// import components from files:
import Logout from "./logout";
import Avatar from "./avatar";
import AvatarUpload from "./avatar-upload";
import UserProfile from "./profile";

// create class cmponent called App and export it
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            showUsers: false,
        };
        // methods that change values in this.state need to be bind inside the constructor
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
    }
    // when app is loaded do:
    componentDidMount() {
        fetch("/api/users/me")
            .then((res) => res.json())
            .then((data) => {
                const { first_name, last_name } = data;
                // create default values for data = null
                const bio = data.bio
                    ? data.bio
                    : "Tell us something about you...";
                const profile_picture_url = data.profile_picture_url
                    ? data.profile_picture_url
                    : "https://imageboard-spiced.s3.eu-central-1.amazonaws.com/AeguJPpP9Q83BLXcdeUGZlCJjH7BJvYP.jpeg";
                this.setState({
                    first_name,
                    last_name,
                    profile_picture_url,
                    bio,
                });
            })
            .catch((err) => console.error(err));
    }
    // change to a ternary operation switch 📌
    onProfileClick() {
        // change the state by using .setState and the object({statename: value})!!!
        this.setState({ showModal: true });
    }
    // change to a ternary operation switch 📌
    closeModal() {
        this.setState({ showModal: false });
    }
    // method to change avatar on the fly
    onUpload(img_url) {
        this.setState({ showModal: false, profile_picture_url: img_url });
    }
    // method to update bio text on the fly
    updateBio(bio) {
        this.setState({ bio: bio });
    }
    render() {
        if (!this.state.first_name) {
            return <div>loading...</div>; // change to a loading modal
        }
        return (
            <>
                <header>
                    <p>I MIGHT BECOME A LOGO</p>
                    <Logout />
                    <Avatar
                        className="avatar-small"
                        profile_picture_url={this.state.profile_picture_url}
                        onProfileClick={this.onProfileClick}
                    />
                </header>
                <main>
                    <div className="sidebar-container-left"></div>
                    <div className="content-container">
                        <UserProfile
                            updateBio={this.updateBio}
                            profile_picture_url={this.state.profile_picture_url}
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            bio={this.state.bio}
                        />
                    </div>
                    <div className="sidebar-container-right"></div>
                </main>
                <footer>
                    {this.state.showModal && (
                        <AvatarUpload
                            closeModal={this.closeModal}
                            onUpload={this.onUpload}
                        />
                    )}
                </footer>
            </>
        );
    }
}
