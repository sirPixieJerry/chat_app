import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(evt) {
        this.setState(
            {
                [evt.target.name]: evt.target.value,
            },
            () => console.log(this.state)
        );
    }

    handleLogin(evt) {
        evt.preventDefault();
        console.log("USER TRIED TO LOGIN!", this.state);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                if (!result.success) {
                    this.setState({ error: true });
                } else {
                    console.log("let me in!");
                    location.replace("/"); // lookup reload() and replace()
                }
            })
            .catch((err) => {
                this.setState({ error: true });
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <h1>LOGIN COMPONENT:</h1>
                {this.state.error && <p>Oops, something went wrong!</p>}
                <form onSubmit={this.handleLogin}>
                    <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your Email..."
                        required
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        required
                    />
                    <button>SUBMIT</button>
                </form>
                <p>
                    Click <Link to="/">here</Link> to register!
                </p>
            </>
        );
    }
}
