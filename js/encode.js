// Copyright (c) 2023 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


/*
    ","	"%2C"
    ";"	"%3B"
    ":"	"%3A"
    "?"	"%3F"
    "@"	"%40"
    "/"	"%2F"
    "&"	"%26"
    "#"	"%23"
    "+"	"%2B"
    "="	"%3D"
    "$"	"%24"
*/
const encodeTargetCharDiff = [
    { "Char": ",", "Code": "%2C" },
    { "Char": ";", "Code": "%3B" },
    { "Char": ":", "Code": "%3A" },
    { "Char": "?", "Code": "%3F" },
    { "Char": "@", "Code": "%40" },
    { "Char": "/", "Code": "%2F" },
    { "Char": "&", "Code": "%26" },
    { "Char": "#", "Code": "%23" },
    { "Char": "+", "Code": "%2B" },
    { "Char": "=", "Code": "%3D" },
    { "Char": "$", "Code": "%24" }
];


const decodeURI2decodeURIComponent = (src) => {
    let result = '';
    [].forEach.call(
        // decodeURI(src),
        src,
        char => {
            switch (char) {
                case ",": result += "%2C"; break;
                case ";": result += "%3B"; break;
                case ":": result += "%3A"; break;
                case "?": result += "%3F"; break;
                case "@": result += "%40"; break;
                case "/": result += "%2F"; break;
                case "&": result += "%26"; break;
                case "#": result += "%23"; break;
                case "+": result += "%2B"; break;
                case "=": result += "%3D"; break;
                case "$": result += "%24"; break;
                default: result += char; break;
            }
        });

    return result;
};


const decodeURIComponent2decodeURI = (src) => {
    let result = '';
    [].forEach.call(
        // decodeURIComponent(src),
        src,
        char => {
            switch (char) {
                case "%2C": result += ","; break;
                case "%3B": result += ";"; break;
                case "%3A": result += ":"; break;
                case "%3F": result += "?"; break;
                case "%40": result += "@"; break;
                case "%2F": result += "/"; break;
                case "%26": result += "&"; break;
                case "%23": result += "#"; break;
                case "%2B": result += "+"; break;
                case "%3D": result += "="; break;
                case "%24": result += "$"; break;
                default: result += char; break;
            }
        });

    return result;
};


const encodeURI2encodeURIComponent = (src) => {
    let result = '';
    [].forEach.call(
        // encodeURI(src),
        src,
        char => {
            switch (char) {
                case ",": result += "%2C"; break;
                case ";": result += "%3B"; break;
                case ":": result += "%3A"; break;
                case "?": result += "%3F"; break;
                case "@": result += "%40"; break;
                case "/": result += "%2F"; break;
                case "&": result += "%26"; break;
                case "#": result += "%23"; break;
                case "+": result += "%2B"; break;
                case "=": result += "%3D"; break;
                case "$": result += "%24"; break;
                default: result += char; break;
            }
        });
    return result;
};


const encodeURIComponent2encodeURI = (src) => {
    let result = '';
    [].forEach.call(
        // encodeURIComponent(src),
        src,
        char => {
            switch (char) {
                case "%2C": result += ","; break;
                case "%3B": result += ";"; break;
                case "%3A": result += ":"; break;
                case "%3F": result += "?"; break;
                case "%40": result += "@"; break;
                case "%2F": result += "/"; break;
                case "%26": result += "&"; break;
                case "%23": result += "#"; break;
                case "%2B": result += "+"; break;
                case "%3D": result += "="; break;
                case "%24": result += "$"; break;
                default: result += char; break;
            }
        });
    return result;
};
