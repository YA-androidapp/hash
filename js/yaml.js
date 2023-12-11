// Copyright (c) 2023 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const json2yaml = (jsonStr) => {
    const jsonObj = JSON.parse(jsonStr);
    const yamlStr = YAML.stringify(jsonObj);

    return yamlStr;
};

const yaml2json = (yamlStr) => {
    const jsonObj = YAML.parse(yamlStr);

    // const jsonStr = JSON.stringify(jsonObj);
    const jsonStr = JSON.stringify(jsonObj, null, "\t");

    return jsonStr;
};
