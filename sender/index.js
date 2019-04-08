"use strict;"

const request = require("request");
const fs = require("fs");

//
// Stream a local file to an remote end point via HTTP PUT.
//
function streamFileToEndPoint(localFilePath, fileUploadUrl) {
    return new Promise((resolve, reject) => {
        const fileInputStream = fs.createReadStream(localFilePath);
        const httpPutStream = request.put(fileUploadUrl);
        fileInputStream.pipe(httpPutStream)
            .on("error", reject)
            .on("finish", resolve);
    });
}

async function main() {
    console.log("Uploading file.");
    await streamFileToEndPoint("./example.pdf", "http://localhost:3000/upload-file");
    console.log("File was succesfully uploaded.");
}

main()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("The upload failed.");
        console.error(err && err.stack || err);
    });