// Copyright (c) 2023 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const performEncodeUri = _ => {
    document.getElementById('encodeuri_encoded').value = encodeURI(
        document.getElementById('encodeuri_decoded').value
    );
};

const performDecodeUri = _ => {
    document.getElementById('encodeuri_decoded').value = decodeURI(
        document.getElementById('encodeuri_encoded').value
    );
};

const performEncodeURIComponent = _ => {
    let unicodeArray = Encoding.stringToCode(document.getElementById('encodeuri_decoded').value);
    let sjisArray = Encoding.convert(unicodeArray, {
        to: document.getElementById('encodeuri_charset').value,
        from: 'UNICODE'
    });
    let encoded = Encoding.urlEncode(sjisArray);
    document.getElementById('encodeuricomponent_encoded').value = encoded;
};

const performDecodeURIComponent = _ => {
    let encoded = document.getElementById('encodeuricomponent_encoded').value;
    let decoded = Encoding.urlDecode(encoded);
    let detectedEncoding = Encoding.detect(decoded);
    console.log('Character encoding is ' + detectedEncoding);

    document.getElementById('encodeuri_decoded').value = Encoding.codeToString(Encoding.convert(decoded, {
        to: 'UNICODE',
        from: detectedEncoding
    }));
};