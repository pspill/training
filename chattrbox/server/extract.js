
var extractFilePath = function (url) {
    var filePath;
    var fileName = 'index.html';
    if (url.length > 1) {
        fileName = url.substring(1);
    }
    console.log(`The fileName is : ${fileName}`);

    return fileName;
}

module.exports = extractFilePath;