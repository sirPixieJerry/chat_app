import ReactDOM from "react-dom";
import Welcome from "./welcome";

fetch("/user/id.json")
    .then((res) => res.json())
    .then((user_id) => {
        if (!user_id) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <h1>I MIGHT BECOME A LOGO</h1>,
                document.querySelector("main")
            );
        }
    })
    .catch((err) => console.log(err));
