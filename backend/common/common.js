const db = require("./database");
/**
 * @description common functions definition
 */
const Common = {
    //check API key
    checkAuth : async (token) => {
        if(!token){
            return false;
        }
        let result = false;
        const rows = await Common.db_all(`SELECT count(*) as is_exist from tokens where token="${token}"`);
    
        if (rows[0].is_exist){
            result = true;
        }
        return result;
    },
    //definition db_all function to use async/await on sqlite db.all function
    db_all : async (query) => {
        return new Promise(function(resolve,reject){
            db.all(query, function(err,rows){
               if(err){return reject(err);}
               resolve(rows);
             });
        });
    },
    //generate API Key and store database
    generateAPIKey : () => {
        //generate API key
        let token = Common.generateUString(20);
        //store database
        let insert = 'INSERT INTO tokens (token) VALUES (?)'
        db.run(insert, [token], (err , result) => {
            return token;
        });
        return token;
    },
    //generate random string with given string length
    generateUString : (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
module.exports = Common;