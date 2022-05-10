export default function AvatarUpload({ closeModal, onUpload }) {
    function onSubmit(evt) {
        evt.preventDefault();
        onUpload();
        // perform upload fetch
        // call img
        // close modal
    }
    return (
        <div className="blackbox">
            <button className="close" onClick={closeModal}>
                ❌
            </button>
            <div className="avatar-upload">
                <h2>Upload profile image!</h2>
                <form onSubmit={onSubmit}>
                    <input type="file" required name="file" />
                    <button>UPLOAD</button>
                </form>
            </div>
        </div>
    );
}
