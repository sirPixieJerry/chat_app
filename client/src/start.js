import ReactDOM from "react-dom";
import Welcome from "./welcome";

// const elem = (
//     <>
//         <Welcome />
//     </>
// );

fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        if (!data.user_id) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                // <img src="./logo.jpg" />,
                document.querySelector("main")
            );
        }
    })
    .catch((err) => console.log(err));

// ReactDOM.render(elem, document.querySelector("main"));
