import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <section>
            <h1>Welcome to my social network!</h1>
            {/* some kind of cool logo */}
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
            <Registration />
        </section>
    );
}
