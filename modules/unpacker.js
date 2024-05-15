const unpacker = require("unpacker-with-progress");
const progress = require('progress');
const path = require('path');
const fs = require('fs');

module.exports = {

    /**
     * Unpacks a tar.gz file into the specified destination path.
     * @param {string} zip Path to a tar.gz file.
     * @param {string} destinationPath Path to the destination folder.
     * @returns 
     */
    unpack: async function (zip, destinationPath) {
        const fileSize = fs.statSync(zip).size;
        const progressBar = new progress(`Unpacking ${path.basename(zip)} [:bar] :rate/bps :percent :etas`, {
            width: 40,
            complete: '=',
            incomplete: ' ',
            renderThrottle: 100,
            total: fileSize
        });
        return Promise.all([
            unpacker(zip, destinationPath, {
                onprogress(progress) {
                    progressBar.update(progress.percent);
                }
            })
        ]);
    }
};