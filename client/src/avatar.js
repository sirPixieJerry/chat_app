// component to show avatar picture on welcome page
// pass the prop profile_picture_url and the Method onProfileClick to component
const defaultAvatar =
    "https://imageboard-spiced.s3.eu-central-1.amazonaws.com/AeguJPpP9Q83BLXcdeUGZlCJjH7BJvYP.jpeg";

export default function Avatar({
    profile_picture_url,
    onProfileClick,
    ...rest
}) {
    const profile_picture = profile_picture_url || defaultAvatar;
    return <img src={profile_picture} onClick={onProfileClick} {...rest} />;
}
