import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/user/id.json")
    .then((res) => res.json())
    .then((user_id) => {
        if (!user_id) {
            ReactDOM.render(<Welcome />, document.getElementById("container"));
        } else {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById("container")
            );
        }
    })
    .catch((err) => console.log(err));
