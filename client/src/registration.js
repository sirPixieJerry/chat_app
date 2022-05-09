import { Component } from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState(
            {
                [evt.target.name]: evt.target.value,
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log("USER TRIED TO SUBMIT");
        fetch("/register", {
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
                }
                // if something goes wrong => render an error
                location.replace("/"); // maybe window.location.replace // lookup reload() and replace()
            })
            .catch((err) => {
                // if something goes wrong => render an error
            });
    }

    render() {
        return (
            <>
                <h1>Registration Component</h1>
                {this.state.error && <p>Oops, something went wrong!</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                    />
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                    />
                    <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button>Submit</button>
                </form>
                <BrowserRouter>
                    <Link to="/login">Click here to Login!</Link>
                </BrowserRouter>
            </>
        );
    }
}
