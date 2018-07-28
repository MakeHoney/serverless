"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const table = "monthlyWinner";

module.exports.put = (event, context, callback) => {
  const data = event.body;
  const putQuery = {
    TableName: table,
    Item: {
      season: data.season,
      winners: { ...data.winners }
    }
  };
  dynamoDb.put(putQuery, (err, data) => {
    if (err) {
      callback(null, {
        statusCode: 403,
        body: err
      });
    }
    callback(null, {
      statusCode: 200,
      body: "created!"
    });
  });
};

module.exports.get = (event, context, callback) => {
  const data = event.pathParameters.id;
  const getQuery = {
    TableName: table,
    Key: {
      season: data
    }
  };
  dynamoDb.get(getQuery, (err, data) => {
    if (err) {
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "데이터를 가져올 수 없습니다"
      });
    }
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data.Item)
    });
  });
};
