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
        console.log("USER TRIED TO LOGIN!");
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "applictaion/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                // if something goes wrong => render an error
                // if all goes to plan, refresh the page
            })
            .catch((err) => console.log(err));
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
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                    />
                    <button>SUBMIT</button>
                </form>
                <Link to="/register">Click here to Register!</Link>
            </>
        );
    }
}
