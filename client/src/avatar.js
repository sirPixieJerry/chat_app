// component to show avatar picture on welcome page
// pass the prop profile_picture_url and the Method onProfileClick to component
export default function Avatar({ profile_picture_url, onProfileClick }) {
    return <img src={profile_picture_url} onClick={onProfileClick} />;
}
