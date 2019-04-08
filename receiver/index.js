"use strict;"

const express = require("express");
const fs = require("fs");

const app = express();

function streamToFile(inputStream, localFilePath) {
    return new Promise((resolve, reject) => {
        const fileOutputStream = fs.createWriteStream(localFilePath);
        inputStream.pipe(fileOutputStream)
            .on("error", reject)
            .on("finish", resolve);
    });
}

app.put('/upload-file', (req, res) => {

    console.log("Saving uploaded file.");

    streamToFile(req, "./uploaded-file.pdf")
        .then(() => {
            console.log("Saved uploaded file successfully.");
            res.sendStatus(200);
        })
        .catch(err => {
            console.error("Failed to save uploaded file.");
            console.error(err && err.stack || err);
            res.sendStatus(500);
        });
});

app.listen(3000, () => {
    console.log(`Server is online.`);
});