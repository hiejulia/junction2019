# b64-to-image

[![npm version](https://img.shields.io/badge/npm-v1.0.2-brightgreen.svg)](https://www.npmjs.com/package/b64-to-image/v/1.0.2)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/riteshgandhi/b64-to-image)

Node module to Convert Base64 string to Image

## Installation

Use one of the following methods to add the Star Rating library to your project:

- [Download ZIP](https://github.com/riteshgandhi/b64-to-image/archive/master.zip)
- `npm install b64-to-image`

## Usage

```JavaScript
const base64ImageDecoder = require('b64-to-image');

// valid base64 string
let base64String = '"data:image/png;base64,iVBORw0...."'
base64ImageDecoder.convert(base64String, 'output\\images', 'testImage')
    .then(result => {console.log(result);})
    .catch(err => console.error(err));
```

## Changelog

`v1.0.2 - [2019-01-15]`
- Added repository information

`v1.0.1 - [2019-01-15]`
- Added keywords

`v1.0.0 - [2019-01-15]`
- Initial release

## License

[MIT](/LICENSE)