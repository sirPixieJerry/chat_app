// import components from files:
import Avatar from "./avatar";
import BioEditor from "./bio";

// component to show user's profile
export default function UserProfile({
    updateBio,
    profile_picture_url,
    onProfileClick,
    first_name,
    last_name,
    bio,
}) {
    return (
        <>
            <div className="profile-header">
                <Avatar
                    className="avatar-big"
                    profile_picture_url={profile_picture_url}
                    onClick={onProfileClick}
                />
                <div>
                    <p>
                        {first_name} {last_name}
                    </p>
                    <p>{bio}</p>
                    <BioEditor updateBio={updateBio} />
                </div>
            </div>
        </>
    );
}
