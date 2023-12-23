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
    document.getElementById('text2hash_hashed').addEventListener('focus', _ => {
        this.select();
    });

    document.getElementById('hashtype').addEventListener('change', _ => {
        document.getElementById('text2hash_hashed').value = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });

    document.getElementById('text2hash_message').addEventListener('keyup', _ => {
        document.getElementById('text2hash_hashed').value = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });


    // 文字コード変換
    const saveBinary = (array) => {
        let buffer = new ArrayBuffer(array.length);
        let dv = new DataView(buffer);

        array.forEach((v, i) => {
            dv.setUint8(i, v);
        })

        var a = document.getElementById('codeConversion_resultBlob');
        a.style.display = 'inline';

        var blob = new Blob([buffer], { type: 'octet/stream' }),
            url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = 'result.txt';
        // a.click();
        window.URL.revokeObjectURL(url);
    };

    const performCodeConversion = _ => {
        let unicodeArray = Encoding.stringToCode(document.getElementById('codeConversion_message').value);
        let convArray = Encoding.convert(unicodeArray, {
            to: document.getElementById('codeConversion_charset').value,
            from: 'UNICODE'
        });
        document.getElementById('codeConversion_result').value = convArray.join(' ');
        saveBinary(convArray);
    };
    document.getElementById('codeConversion_charset').addEventListener('change', performCodeConversion);
    document.getElementById('codeConversion_message').addEventListener('keyup', performCodeConversion);


    // Base64
    const performBase64Encode = _ => {
        let unicodeArray = Encoding.stringToCode(document.getElementById('base64_decoded').value);
        let sjisArray = Encoding.convert(unicodeArray, {
            to: document.getElementById('base64_charset').value,
            from: 'UNICODE'
        });
        let encoded = Encoding.base64Encode(sjisArray);
        document.getElementById('base64_encoded').value = encoded;
    };
    document.getElementById('base64_charset').addEventListener('change', performBase64Encode);
    document.getElementById('base64_decoded').addEventListener('keyup', performBase64Encode);

    document.getElementById('base64_encoded').addEventListener('keyup', _ => {
        let encoded = document.getElementById('base64_encoded').value;
        let decoded = Encoding.base64Decode(encoded);
        let detectedEncoding = Encoding.detect(decoded);
        console.log('Character encoding is ' + detectedEncoding);

        document.getElementById('base64_decoded').value = Encoding.codeToString(Encoding.convert(decoded, {
            to: 'UNICODE',
            from: detectedEncoding
        }));
    });


    // URLエンコード
    document.getElementById('encodeuri_charset').addEventListener('change', _ => {
        performEncodeUri();
        performEncodeURIComponent();
    });

    document.getElementById('encodeuri_decoded').addEventListener('keyup', _ => {
        performEncodeUri();
        performEncodeURIComponent();
    });

    document.getElementById('encodeuri_encoded').addEventListener('keyup', _ => {
        performDecodeUri();
    });

    document.getElementById('encodeuricomponent_encoded').addEventListener('keyup', _ => {
        performDecodeURIComponent();
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

    document.getElementById('escapetype').addEventListener('change', _ => {
        document.getElementById('charref_escaped').value = escapeHTML(
            document.getElementById('escapetype').value,
            document.getElementById('charref_message').value
        );
    });

    document.getElementById('charref_message').addEventListener('keyup', _ => {
        document.getElementById('charref_escaped').value = escapeHTML(
            document.getElementById('escapetype').value,
            document.getElementById('charref_message').value
        );
    });


    // JSON <==> TSV
    document.getElementById('clearJsonTsv').addEventListener('click', _ => {
        document.getElementById('jsonTsv_json').value = '';
        document.getElementById('jsonTsv_tsv').value = '';
    });

    document.getElementById('insertTabTsv').addEventListener('click', _ => {
        const jsonTsvTextareaTsv = document.getElementById('jsonTsv_tsv');

        jsonTsvTextareaTsv.value = jsonTsvTextareaTsv.value.substr(0, jsonTsvTextareaTsv.selectionStart)
            + '\t'
            + jsonTsvTextareaTsv.value.substr(jsonTsvTextareaTsv.selectionStart);
    });

    document.getElementById('jsonTsv_json').addEventListener('keyup', _ => {
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
                        delimiter: document.getElementById('delimiter').value === '' ? ',' : (document.getElementById('delimiter').value === '\\t' ? '\t' : document.getElementById('delimiter').value),
                        header: document.getElementById('header').value,
                        newline: '\r\n',
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

    document.getElementById('jsonTsv_tsv').addEventListener('keyup', _ => {
        if (document.getElementById('jsonTsv_tsv').value === '') {
            document.getElementById('jsonTsv_json').value = '';

            document.getElementById('jsonTsv_alert').innerText = '';
            document.getElementById('jsonTsv_alert').style.display = 'none';
        } else {
            try {
                const jsonStr = tsv2json(
                    document.getElementById('jsonTsv_tsv').value,
                    {
                        comments: '#',
                        delimiter: document.getElementById('delimiter').value === '\\t' ? '\t' : document.getElementById('delimiter').value, // auto-detect
                        dynamicTyping: true,
                        escapeChar: '"',
                        header: document.getElementById('header').value,
                        newline: '', // auto-detect
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


    // JSON <==> YAML
    document.getElementById('clearJsonYaml').addEventListener('click', _ => {
        document.getElementById('jsonYaml_json').value = '';
        document.getElementById('jsonYaml_yaml').value = '';
    });

    document.getElementById('jsonYaml_json').addEventListener('keyup', _ => {
        if (document.getElementById('jsonYaml_json').value === '') {
            document.getElementById('jsonYaml_yaml').value = '';

            document.getElementById('jsonYaml_alert').innerText = '';
            document.getElementById('jsonYaml_alert').style.display = 'none';
        } else {
            try {
                const yamlStr = json2yaml(document.getElementById('jsonYaml_json').value);
                document.getElementById('jsonYaml_yaml').value = yamlStr;

                document.getElementById('jsonYaml_alert').innerText = '';
                document.getElementById('jsonYaml_alert').style.display = 'none';
            } catch (error) {
                // console.error(error);
                document.getElementById('jsonYaml_alert').innerText = error;
                document.getElementById('jsonYaml_alert').style.display = 'block';
            }
        }
    });

    document.getElementById('jsonYaml_yaml').addEventListener('keyup', _ => {
        if (document.getElementById('jsonYaml_yaml').value === '') {
            document.getElementById('jsonYaml_json').value = '';

            document.getElementById('jsonYaml_alert').innerText = '';
            document.getElementById('jsonYaml_alert').style.display = 'none';
        } else {
            try {
                const jsonStr = yaml2json(document.getElementById('jsonYaml_yaml').value);
                document.getElementById('jsonYaml_json').value = jsonStr;

                document.getElementById('jsonYaml_alert').innerText = '';
                document.getElementById('jsonYaml_alert').style.display = 'none';
            } catch (error) {
                // console.error(error);
                document.getElementById('jsonYaml_alert').innerText = error;
                document.getElementById('jsonYaml_alert').style.display = 'block';
            }
        }
    });

    // Password
    const generatePassword = () => {

        let charSet = (document.getElementById('password_source').value).replaceAll('\n', '');
        let length = document.getElementById('password_length').value;
        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += charSet[Math.floor(Math.random() * charSet.length)];
        }

        document.getElementById('password_generated').value = generated;
    };


    document.getElementById('password_generate').addEventListener('click', _ => {
        generatePassword();
    });

    document.getElementById('password_source').addEventListener('change', _ => {
        generatePassword();
    });

    document.getElementById('password_length').addEventListener('change', _ => {
        generatePassword();
    });

});
