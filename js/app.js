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
    document.getElementById('text2hash_range').addEventListener('focus', function () {
        this.select();
    });

    // 変換
    document.getElementById('hashtype').addEventListener('change', function () {
        document.getElementById('text2hash_range').textContent = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });

    document.getElementById('text2hash_message').addEventListener('keyup', function () {
        document.getElementById('text2hash_range').textContent = text2hash(
            document.getElementById('hashtype').value,
            document.getElementById('text2hash_message').value
        );
    });

});
