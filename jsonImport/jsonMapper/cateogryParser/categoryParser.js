const fs = require('fs');
const groupsBase = require('../problemgroupsBase.json');

async function execute() {
    const resultArr = [];
    for (let groupBase of groupsBase) {
        let result = {}
        result._id = groupBase._id.$oid;
        result.title = groupBase.name;
        result.children = [];
        resultArr.push(result);
    }

    const resultStr = JSON.stringify(resultArr);
    fs.writeFileSync('./problemgroupsResult.json', resultStr);
}

module.exports = { execute };


