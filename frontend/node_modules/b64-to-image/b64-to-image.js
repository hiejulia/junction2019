const fs = require('fs');

const convert = (base64String, outputPath, imageName = null, imageType = null) => {
    return new Promise((resolve, reject) => {
        let base64Data = [];
        let convertedImageInfo;
        let base64ImageString;

        if (base64String.length <= 0 ||
            (base64String.length > 0 && !base64String.toLowerCase().startsWith('data'))) {
            reject(new Error('Invalid Base64 string'));
        }

        if (!outputPath) {
            reject(new Error('No output path supplied'));
        }

        base64Data = base64String.split('/');
        if (base64Data.length > 0) {
            if (!imageType) {
                imageType = base64Data[1].split(';')[0];
            }

            if (!imageName) {
                let currentDate = new Date();
                imageName = `image_${currentDate.getMonth()}_${currentDate.getDay()}_${currentDate.getSeconds()}.${imageType}`;
            }

            imageName = !imageName.split['.'] ? `${imageName}.${imageType}` : imageName;

            base64ImageString = base64String.split(';base64,').pop();
        }

        if (base64ImageString) {
            let path = `${outputPath}\\${imageName}`;
            fs.writeFile(path, base64ImageString, { encoding: 'base64' }, function (err) {
                if (err) {
                    reject(err);
                }
                convertedImageInfo = { name: imageName, type: imageType, path: outputPath, fullPath: path };
                resolve(JSON.stringify(convertedImageInfo));
            });
        }
    })
}

module.exports = {
    convert
}