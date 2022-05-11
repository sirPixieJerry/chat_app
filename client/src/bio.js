// import Component from react:
import { Component } from "react";

// component to show and update the bio of the user
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchEditMode = this.switchEditMode.bind(this);
    }
    switchEditMode() {
        this.setState((prevState) => ({
            editMode: !prevState.editMode,
        }));
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
            .then((rows) => {
                this.props.updateBio(rows.bio);
                this.setState({ editMode: false });
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <>
                {!this.state.editMode && (
                    <button onClick={this.switchEditMode}>EDIT BIO</button>
                )}
                {this.state.editMode && (
                    <form onSubmit={this.handleSubmit}>
                        <input name="text" />
                        <button type="submit">UPDATE</button>
                        <button onClick={this.switchEditMode} type="button">
                            CHANCEL
                        </button>
                    </form>
                )}
            </>
        );
    }
}
