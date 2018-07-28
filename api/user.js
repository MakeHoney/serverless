"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const table = "user";

module.exports.login = (event, context, callback) => {
  const data = event.body;

  const SearchQuery = {
    TableName: table,
    Key: {
      user_email: data.email
    }
  };

  dynamoDb.get(SearchQuery, (err, data) => {
    if (!err) {
      return callback(null, {
        statusCode: 200,
        headers: { "Conetent-Type": "text/plain" },
        body: "loggined"
      });
    }

    const putQuery = {
      TableName: "user",
      Item: {
        user_email: data.email,
        nickName: data.nickName
      }
    };

    dynamoDb.put(putQuery, (err, data) => {
      if (err) {
        callback(null, {
          statusCode: 503,
          headers: { "Conetent-Type": "text/plain" },
          body: "UserCreateFail"
        });
      }
      callback(null, {
        statusCode: 200,
        headers: { "Conetent-Type": "text/plain" },
        body: "user loggined!"
      });
    });
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
