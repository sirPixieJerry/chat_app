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
        };
        // methods that change values in this.state need to be bind inside the constructor
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    // when app is loaded do:
    componentDidMount() {
        fetch("/api/users/me")
            .then((res) => res.json())
            .then((data) => {
                const { first_name, last_name, profile_picture_url, bio } =
                    data;
                this.setState({
                    first_name,
                    last_name,
                    profile_picture_url,
                    bio,
                });
            })
            .catch((err) => console.error(err));
    }
    onProfileClick() {
        // change the state by using .setState and the object({statename: value})!!!
        this.setState({ showModal: true });
    }
    closeModal() {
        this.setState({ showModal: false });
    }
    onUpload(img_url) {
        this.setState({ showModal: false, profile_picture_url: img_url });
    }
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
