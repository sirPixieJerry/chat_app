import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleChange.bind(this);
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
        console.log("USER TRIED TO SUBMIT!");
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                // if something goes wrong => render an error
                // if all goes to plan, refresh the page
            })
            .catch((err) => {
                // if something goes wrong => render an error
            });
    }

    render() {
        return (
            <>
                <h1>This is a registration component.</h1>
                {/* react equivalent to v-if in vue*/}
                {this.state.error && <p>Something went wrong!</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="first_name"
                        placeholder="Enter First Name..."
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Enter Last Name..."
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email..."
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password..."
                    />
                    <input
                        type="password"
                        name="password_repeat"
                        placeholder="Repeat Password..."
                    />
                    <button>submit</button>
                </form>
            </>
        );
    }
}
