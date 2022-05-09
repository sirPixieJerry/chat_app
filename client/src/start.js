import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logout from "./logout";

const content = (
    <>
        <h1>I MIGHT BECOME A LOGO</h1>
        <Logout />
    </>
);

fetch("/user/id.json")
    .then((res) => res.json())
    .then((user_id) => {
        if (!user_id) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(content, document.querySelector("main"));
        }
    })
    .catch((err) => console.log(err));
