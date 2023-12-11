// Copyright (c) 2023 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const text2hash = (hashtype, plaintext) => {
    switch (hashtype) {
        case 'MD5':
            return new Hashes.MD5().hex(plaintext);
        case 'SHA1':
            return new Hashes.SHA1().hex(plaintext);
        case 'SHA256':
            return new Hashes.SHA256().hex(plaintext);
        case 'SHA512':
            return new Hashes.SHA512().hex(plaintext);
        case 'RMD160':
            return new Hashes.RMD160().hex(plaintext);
        default:
            return '';
    }
}


window.addEventListener('DOMContentLoaded', (event) => {

    // ハッシュ値
    document.getElementById('text2hash_hashed').addEventListener('focus', function () {
        this.select();
    });

    document.getElementById('hashtype').addEventListener('change', function () {
        document.getElementById('text2hash_hashed').value = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });

    document.getElementById('text2hash_message').addEventListener('keyup', function () {
        document.getElementById('text2hash_hashed').value = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });


    // URLエンコード
    document.getElementById('encodeuri_decoded').addEventListener('keyup', function () {
        document.getElementById('encodeuri_encoded').value = encodeURI(
            document.getElementById('encodeuri_decoded').value
        );
    });

    document.getElementById('encodeuricomponent_decoded').addEventListener('keyup', function () {
        document.getElementById('encodeuricomponent_encoded').value = encodeURIComponent(
            document.getElementById('encodeuricomponent_decoded').value
        );
    });

    document.getElementById('encodeuri_encoded').addEventListener('keyup', function () {
        let decoded = '';
        try {
            decoded = decodeURI(
                document.getElementById('encodeuri_encoded').value
            );
        } catch (err) {
            decoded = document.getElementById('encodeuri_encoded').value;
        }

        document.getElementById('encodeuri_decoded').value = decoded;
    });

    document.getElementById('encodeuricomponent_encoded').addEventListener('keyup', function () {
        let decoded = '';
        try {
            decoded = decodeURIComponent(
                document.getElementById('encodeuricomponent_encoded').value
            );
        } catch (err) {
            decoded = document.getElementById('encodeuricomponent_encoded').value;
        }

        document.getElementById('encodeuricomponent_decoded').value = decoded;
    });


    // エスケープ
    const escapeCharacterEntityReference = (str) => {
        return str
            .replace(/&/g, '&amp;')

            .replace(/'/g, '&apos;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            ;
    };

    const escapeNumericCharacterReference = (str) => {
        let result = '';
        const strl = str.length;
        for (var i = 0; i < strl; i++) {
            result = result + '&#' + str.charCodeAt(i) + ';';
        }
        return result;
    };

    const unescapeAll = (str) => {
        const div = document.createElement('div');
        div.innerHTML = str
            .replace(/ /g, '&nbsp;')
            .replace(/\n/g, '&#10;')
            .replace(/\r/g, '&#13;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            ;
        return div.textContent
            .replace('&apos;', "'")
            .replace('&quot;', '"')
            ;
    };

    const escapeHTML = (type, str) => {
        if (type == 'escapeCharacterEntityReference') {
            return escapeCharacterEntityReference(str);
        } else if (type == 'escapeNumericCharacterReference') {
            return escapeNumericCharacterReference(str);
        } else if (type == 'unescapeAll') {
            return unescapeAll(str);
        } else {
            return '';
        }
    };

    document.getElementById('escapetype').addEventListener('change', function () {
        document.getElementById('charref_escaped').value = escapeHTML(
            document.getElementById('escapetype').value,
            document.getElementById('charref_message').value
        );
    });

    document.getElementById('charref_message').addEventListener('keyup', function () {
        document.getElementById('charref_escaped').value = escapeHTML(
            document.getElementById('escapetype').value,
            document.getElementById('charref_message').value
        );
    });


    // JSON <==> TSV
    document.getElementById('clearJsonTsv').addEventListener('click', function () {
        document.getElementById('jsonTsv_json').value = '';
        document.getElementById('jsonTsv_tsv').value = '';
    });

    document.getElementById('insertTab').addEventListener('click', function () {
        const jsonTsvTextareaTsv = document.getElementById('jsonTsv_tsv');

        jsonTsvTextareaTsv.value = jsonTsvTextareaTsv.value.substr(0, jsonTsvTextareaTsv.selectionStart)
            + "\t"
            + jsonTsvTextareaTsv.value.substr(jsonTsvTextareaTsv.selectionStart);
    });

    document.getElementById('jsonTsv_json').addEventListener('keyup', function () {
        if (document.getElementById('jsonTsv_json').value === '') {
            document.getElementById('jsonTsv_tsv').value = '';

            document.getElementById('jsonTsv_alert').innerText = '';
            document.getElementById('jsonTsv_alert').style.display = 'none';
        } else {
            try {
                const tsvStr = json2tsv(
                    document.getElementById('jsonTsv_json').value,
                    {
                        quotes: false, //or array of booleans
                        quoteChar: '"',
                        escapeChar: '"',
                        delimiter: document.getElementById('delimiter').value === "" ? "," : (document.getElementById('delimiter').value === "\\t" ? "\t" : document.getElementById('delimiter').value),
                        header: document.getElementById('header').value,
                        newline: "\r\n",
                        skipEmptyLines: true, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
                        columns: null //or array of strings
                    }
                );
                document.getElementById('jsonTsv_tsv').value = tsvStr;

                document.getElementById('jsonTsv_alert').innerText = '';
                document.getElementById('jsonTsv_alert').style.display = 'none';
            } catch (error) {
                // console.error(error);
                document.getElementById('jsonTsv_alert').innerText = error;
                document.getElementById('jsonTsv_alert').style.display = 'block';
            }
        }
    });

    document.getElementById('jsonTsv_tsv').addEventListener('keyup', function () {
        if (document.getElementById('jsonTsv_tsv').value === '') {
            document.getElementById('jsonTsv_json').value = '';

            document.getElementById('jsonTsv_alert').innerText = '';
            document.getElementById('jsonTsv_alert').style.display = 'none';
        } else {
            try {
                const jsonStr = tsv2json(
                    document.getElementById('jsonTsv_tsv').value,
                    {
                        comments: "#",
                        delimiter: document.getElementById('delimiter').value === "\\t" ? "\t" : document.getElementById('delimiter').value, // auto-detect
                        dynamicTyping: true,
                        escapeChar: '"',
                        header: document.getElementById('header').value,
                        newline: "", // auto-detect
                        preview: 0,
                        quoteChar: '"',
                        skipEmptyLines: true,
                        skipFirstNLines: 0,
                    }
                );
                document.getElementById('jsonTsv_json').value = jsonStr;

                document.getElementById('jsonTsv_alert').innerText = '';
                document.getElementById('jsonTsv_alert').style.display = 'none';
            } catch (error) {
                // console.error(error);
                document.getElementById('jsonTsv_alert').innerText = error;
                document.getElementById('jsonTsv_alert').style.display = 'block';
            }
        }
    });

});
