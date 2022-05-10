export default function Avatar({ profile_picture_url, onProfileClick }) {
    return (
        <img
            className="avatar"
            src={profile_picture_url}
            onClick={onProfileClick}
        />
    );
}
