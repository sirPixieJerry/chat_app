export default function Example(props) {
    console.log("PROPS:", props);
    console.log("PROPS URL:", props.profile_picture_url);
    return <img src={props.profile_picture_url} onClick={props.onClick} />;
}
