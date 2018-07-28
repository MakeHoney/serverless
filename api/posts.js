"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const table = "posts";

module.exports.writePost = (event, context, callback) => {
  const data = event.body;
  if (typeof data.title !== "string") {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Internal error"
    });
    return;
  }

  const putQuery = {
    TableName: "posts",
    Item: {
      title: data.title,
      desc: data.desc,
      bucket: data.bucket,
      budget: data.budget,
      period: data.period
    }
  };

  dynamoDb.put(putQuery, (err, data) => {
    if (err) {
      callback(null, {
        statusCode: 503,
        headers: { "Conetent-Type": "text/plain" },
        body: "posting failed!"
      });
    }
    callback(null, {
      statusCode: 200,
      headers: { "Conetent-Type": "text/plain" },
      body: "posting succeeded!"
    });
  });
};
