// component to upload user avatar to the bucket and database
// pass the methods closeModal and onUpload to the component
export default function AvatarUpload({ closeModal, onUpload }) {
    function onSubmit(evt) {
        evt.preventDefault();
        // create new form data
        const formData = new FormData();
        // append image name in upload folder
        formData.append("image", evt.target.file.files[0]);
        // don't forget! with new form data you don't need to send header
        // it will send a multiform header by default!
        fetch("/api/users/me/upload-avatar", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                // call on upload method to update image on the fly
                onUpload(res.profile_picture_url);
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className="blackbox">
            <button className="close" onClick={closeModal}>
                ❌
            </button>
            <div className="avatar-upload">
                <h2>Upload profile image!</h2>
                {/* bind onSubmit method to the form */}
                <form onSubmit={onSubmit}>
                    <input type="file" name="file" accept="image/*" required />
                    <button>UPLOAD</button>
                </form>
            </div>
        </div>
    );
}
