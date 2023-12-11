// Copyright (c) 2023 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const json2tsv = (jsonStr, config) => {
    const tsvStr = Papa.unparse(jsonStr, config);
    return tsvStr;
};

const tsv2json = (tsvStr, config) => {
    const jsonObj = Papa.parse(
        tsvStr,
        config
    );
    console.log(jsonObj.meta.delimiter);

    // const jsonStr = JSON.stringify(jsonObj);
    const jsonStr = JSON.stringify(jsonObj.data, null, "\t");

    return jsonStr;
};
