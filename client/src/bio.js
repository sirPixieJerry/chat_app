// import Component from react:
import { Component } from "react";

// component to show and update the bio of the user
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(evt) {
        evt.preventDefault();
        fetch("/api/users/bio", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bio: evt.target.text.value }),
        })
            .then((res) => res.json())
            .then((rows) => this.props.updateBio(rows.bio))
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <>
                <p>{this.props.bio}</p>
                <form onSubmit={this.handleSubmit}>
                    <input name="text" />
                    <button>EDIT BIO</button>
                </form>
            </>
        );
    }
}
