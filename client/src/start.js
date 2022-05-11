import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

fetch("/user/id.json")
    .then((res) => res.json())
    .then((user_id) => {
        if (!user_id) {
            ReactDOM.render(<Welcome />, document.querySelector("body"));
        } else {
            ReactDOM.render(<App />, document.querySelector("body"));
        }
    })
    .catch((err) => console.log(err));
