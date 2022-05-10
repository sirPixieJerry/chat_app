// require aws-sdk module
const aws = require("aws-sdk");
// require node.js fs module
const fs = require("fs");

/* specify where to take the credentioanls from
   depending on the enviroment */
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../config.json");
}

// access s3 cloud
const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

// export module to upload images to the cloud
module.exports.upload = (req, res, next) => {
    if (!req.file) {
        // if user didn't provide an image or something went wrong with multer
        console.log("no file received");
        return res.sendStatus(500);
    }
    // mimetype = Internet Media Type (png, jpg, etc.)
    const { filename, mimetype, size, path } = req.file;
    const promise = s3
        .putObject({
            Bucket: "imageboard-spiced",
            ACL: "public-read", // makes sure what we upload can be access online
            Key: filename, // is responsible for the name of the object created in the bucket
            Body: fs.createReadStream(path), // stream to where the file is that we like to upload
            ContentType: mimetype, // ensures that under the hood content type headers can be set
            ContentLength: size, // and most likely also content length headers
        })
        .promise();

    promise
        .then(() => {
            console.log("img upload to cloud!");
            next();
            fs.unlink(path, () => {}); // remove temp file from upload folder!
        })
        .catch((err) => console.log("img not in cloud!", err));
};
