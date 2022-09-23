// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


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

    // フォーカス時に全選択
    document.getElementById('text2hash_hashed').addEventListener('focus', function () {
        this.select();
    });

    // 変換
    document.getElementById('hashtype').addEventListener('change', function () {
        document.getElementById('text2hash_hashed').textContent = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });

    document.getElementById('text2hash_message').addEventListener('keyup', function () {
        document.getElementById('text2hash_hashed').textContent = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });

    document.getElementById('encodeuri_decoded').addEventListener('keyup', function () {
        document.getElementById('encodeuri_encoded').textContent = encodeURI(
            document.getElementById('encodeuri_decoded').value
        );
    });

    document.getElementById('encodeuricomponent_decoded').addEventListener('keyup', function () {
        document.getElementById('encodeuricomponent_encoded').textContent = encodeURIComponent(
            document.getElementById('encodeuricomponent_decoded').value
        );
    });

    document.getElementById('encodeuri_encoded').addEventListener('keyup', function () {
        let decoded = "";
        try {
            decoded = decodeURI(
                document.getElementById('encodeuri_encoded').value
            );
        } catch (err) {
            decoded = document.getElementById('encodeuri_encoded').value;
        }

        document.getElementById('encodeuri_decoded').textContent = decoded;
    });

    document.getElementById('encodeuricomponent_encoded').addEventListener('keyup', function () {
        let decoded = "";
        try {
            decoded = decodeURIComponent(
                document.getElementById('encodeuricomponent_encoded').value
            );
        } catch (err) {
            decoded = document.getElementById('encodeuricomponent_encoded').value;
        }

        document.getElementById('encodeuricomponent_decoded').textContent = decoded;
    });

});
