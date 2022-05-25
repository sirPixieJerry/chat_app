import { Component } from "react";
import { Link } from "react-router-dom";

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
                } else {
                    location.reload(); // lookup reload() and replace()
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
                <div className="blackbox">
                    <div className="profile">
                        <h1>TOXICHAT</h1>
                        {this.state.error && <p>Oops, something went wrong!</p>}
                        <form onSubmit={this.handleSubmit}>
                            <input
                                onChange={this.handleChange}
                                type="text"
                                className="message-input"
                                name="first_name"
                                placeholder="First Name"
                                required
                            />
                            <input
                                onChange={this.handleChange}
                                type="text"
                                className="message-input"
                                name="last_name"
                                placeholder="Last Name"
                                required
                            />
                            <input
                                onChange={this.handleChange}
                                type="email"
                                className="message-input"
                                name="email"
                                placeholder="Email Address"
                                required
                            />
                            <input
                                onChange={this.handleChange}
                                type="password"
                                className="message-input"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <input
                                onChange={this.handleChange}
                                type="password"
                                className="message-input"
                                name="password_repeat"
                                placeholder="Password"
                                required
                            />
                            <button>Submit</button>
                        </form>
                        <p>
                            Click <Link to="/login">here</Link> to login!
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
