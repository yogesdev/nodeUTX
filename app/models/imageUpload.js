const queryBuild = require("../configs/db_config");

queryBuild.connect();

let userImageUpload = async (insertData) => {
    let imageInserts = await insertImage(insertData);
    return imageInserts;
}

const insertImage = function (insertData) {
    const promise = new Promise(async function (resolve, reject) {
        queryBuild.query('INSERT INTO product_images SET ?', insertData, function (error, results, fields) {
            if (results) { resolve(results.insertId); }
            else {
                reject(error);
            }
        });

    });

    return promise;
};

module.exports = {
    userImageUpload
}

