import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitStepOne = this.onSubmitStepOne.bind(this);
        this.onSubmitStepTwo = this.onSubmitStepTwo.bind(this);
    }
    handleChange(evt) {
        this.setState(
            {
                [evt.target.name]: evt.target.value,
            },
            () => console.log(this.state)
        );
    }
    onSubmitStepOne(evt) {
        // 🔴 test functionality
        evt.preventDefault();
        fetch("/api/password", {
            method: "POST", // POST for adding values to db
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // 🔴 handle data
                this.setState({ step: 2 });
            })
            .catch((err) => console.log(err));
    }
    onSubmitStepTwo(evt) {
        // 🔴 test functionality
        evt.preventDefault();
        fetch("/api/password", {
            method: "PUT", // PUT for changing values in db
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // 🔴 handle data
                this.setState({ step: 3 });
            })
            .catch((err) => console.log(err));
    }
    renderStepOne() {
        return (
            <form onSubmit={this.onSubmitStepOne}>
                <h3>Step 1</h3>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email..."
                    onInput={this.handleChange}
                />
                <button>SEND VERIFICATION CODE</button>
            </form>
        );
    }
    renderStepTwo() {
        return (
            <form onSubmit={this.onSubmitStepTwo}>
                <h3>Step 2</h3>
                <input
                    name="code"
                    type="text"
                    required
                    placeholder="Enter Code..."
                    onInput={this.handleChange}
                />
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Enter new Password..."
                    onInput={this.handleChange}
                />
                <button>RESET PASSWORD</button>
            </form>
        );
    }
    renderStepThree() {
        return (
            <>
                <h1>PASSWORD RESET!</h1>
                <Link to="/login">login</Link>
            </>
        );
    }
    renderStep() {
        /*eslint indent: [2, 4, {"SwitchCase": 1}]*/
        switch (this.state.step) {
            case 1:
                return this.renderStepOne();
            case 2:
                return this.renderStepTwo();
            case 3:
                return this.renderStepThree();
        }
    }
    render() {
        return (
            <>
                <h1>PASSWORD RESET</h1>
                {this.renderStep()}
                <p>{this.state.error}</p>
            </>
        );
    }
}
