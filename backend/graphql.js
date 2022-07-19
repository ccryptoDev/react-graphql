/**
 * @description graphql queries definition
 * @since 2022/07/12
 */
const axios = require('axios');
const common = require('./common/common')

// The root provides a resolver function for each API endpoint
const root = {
    //returning encoded json response
    //implemented pagination
    reactCommitHistory: async (param) => {
        let token = param.token ? param.token : '';
        let page = param.page ? param.page : 1;
        //check API key
        if(common.checkAuth(token)){
            let res = await axios.get(`https://api.github.com/repos/facebook/react/commits?page=${page}`);
            let returnData = [];
            for(let temp of res.data){
                let record = {};
                record.sha = temp.sha;
                record.message = temp.commit.message;
                record.url = temp.commit.url;
                record.commiterEmail = temp.commit.author.email;
                record.commitDate = temp.commit.author.date;
                returnData.push(record);
            }
            return returnData;
        }
        else {
            return ['no permission'];
        }
    },
    //get countries list for frontend
    getCountriesByCategory : () => {
        data = {
          "id": "0",
          "name": "world",
          "children": [
            {
              "id": "01",
              "name": "Asia",
              "children": [
                {
                  "name": "China",
                  "children": []
                },
                {
                  "name": "Singapore",
                  "children": []
                }
              ]
            },
            {
              "id": "02",
              "name": "Afria",
              "children": [
                {
                  "name": "Epgypt",
                  "children": []
        
                }, {
                  "name": "Nigeria",
                  "children": []
        
                }
              ]
            },
        
            {
              "id": "03",
              "name": "Europe",
              "children": [
                {
                  "name": "Spain",
                  "children": []
        
                },
                {
                  "name": "England",
                  "children": []
        
                }
              ]
            }
        
          ]
        }
          


        return JSON.stringify(data);
    },
    //without API key
    helloWorld : () => {
        return "hello World";
    }
};
module.exports = root;