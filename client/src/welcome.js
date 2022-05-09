import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset-password";

export default function Welcome() {
    return (
        <section>
            <h1>Welcome to my social network!</h1>
            {/* some kind of cool logo */}
            <BrowserRouter>
                <Route exact path="/">
                    <Registration />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/reset-password">
                    <ResetPassword />
                </Route>
            </BrowserRouter>
        </section>
    );
}
