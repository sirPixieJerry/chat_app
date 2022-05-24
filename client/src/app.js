// import Component from react:
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import components from files:
import Logout from "./logout";
import Avatar from "./avatar";
import AvatarUpload from "./avatar-upload";
import UserProfile from "./profile";
import UserSearch from "./findpeople";
import RecentUsers from "./recent-users";
import User from "./view-profile";
import GloabalChat from "./chat";

// create class cmponent called App and export it
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            showUserSearch: false,
        };
        // methods that change values in this.state need to be bind inside the constructor
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.switchUserSearch = this.switchUserSearch.bind(this);
    }
    // when app is loaded do:
    componentDidMount() {
        fetch("/api/users/me")
            .then((res) => res.json())
            .then((data) => {
                const { first_name, last_name, profile_picture_url, id } = data;
                // create default values for data = null
                const bio = data.bio ?? "Tell us something about you...";
                this.setState({
                    first_name,
                    last_name,
                    profile_picture_url,
                    bio,
                    id,
                });
            })
            .catch((err) => console.error(err));
    }
    // switch edit mode to hide/show user search
    switchUserSearch() {
        this.setState((prevState) => ({
            showUserSearch: !prevState.showUserSearch,
        }));
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
                <BrowserRouter>
                    <div className="div1">
                        <Link to="/">
                            <img className="logo" src="/images/logo.png" />
                        </Link>
                    </div>
                    <div className="div2"></div>
                    <div className="div3">
                        <RecentUsers />
                    </div>
                    <div className="div4">
                        <Link to="/profile">
                            <div className="profile">
                                <Avatar
                                    className="avatar-small"
                                    profile_picture_url={
                                        this.state.profile_picture_url
                                    }
                                />

                                <p>
                                    {this.state.first_name}{" "}
                                    {this.state.last_name}
                                </p>
                            </div>{" "}
                        </Link>
                    </div>
                    <div className="div5">
                        <UserSearch />
                        <Link to="/requests" className="custom-button">
                            <img src="/images/addfriend-96.png" />
                        </Link>
                        {this.state.showModal && (
                            <AvatarUpload
                                closeModal={this.closeModal}
                                onUpload={this.onUpload}
                            />
                        )}
                        <Logout />
                    </div>
                    <div className="div6">
                        <Route exact path="/">
                            {/* <RecentUsers /> */}
                            {this.state.showUserSearch && <UserSearch />}
                            <GloabalChat user_id={this.state.id} />
                        </Route>
                        <Route exact path="/profile">
                            <UserProfile
                                updateBio={this.updateBio}
                                profile_picture_url={
                                    this.state.profile_picture_url
                                }
                                onProfileClick={this.onProfileClick}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                bio={this.state.bio}
                                user_id={this.state.id}
                            />
                        </Route>
                        <Route exact path="/requests"></Route>
                        <Route exact path="/user/:user_id">
                            <User />
                        </Route>
                    </div>
                    <div className="div7"></div>
                </BrowserRouter>
            </>
        );
    }
}
