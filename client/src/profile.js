// import components from files:
import Avatar from "./avatar";
import BioEditor from "./bio";
import ShowFriends from "./friends";
import { Link } from "react-router-dom";

// component to show user's profile
export default function UserProfile({
    updateBio,
    profile_picture_url,
    onProfileClick,
    first_name,
    last_name,
    bio,
    user_id,
}) {
    return (
        <>
            <div className="blackbox">
                <div className="profile">
                    <Link to="/">
                        <div className="esc">
                            <img src="/images/esc.png" />
                        </div>
                    </Link>
                    <div className="profile-header"></div>
                    <div className="profile-main">
                        <Avatar
                            className="avatar-big"
                            profile_picture_url={profile_picture_url}
                            onClick={onProfileClick}
                        />
                        <h2>
                            {first_name} {last_name}
                        </h2>
                        <p>{bio}</p>
                        <BioEditor
                            className="update-bio"
                            updateBio={updateBio}
                        />
                    </div>
                    {/* 
                    <div>
                        <ShowFriends user_id={user_id} />
                    </div> */}
                </div>
            </div>
        </>
    );
}
