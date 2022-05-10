export default function AvatarUpload({ closeModal, onUpload }) {
    function onSubmit(evt) {
        evt.preventDefault();
        console.log(evt.target.file.files[0]);
        const formData = new FormData();
        formData.append("image", evt.target.file.files[0]);
        fetch("/api/users/me/upload-avatar", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
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
                <form onSubmit={onSubmit}>
                    <input type="file" name="file" accept="image/*" required />
                    <button>UPLOAD</button>
                </form>
            </div>
        </div>
    );
}
