'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

// Create song files in S3
module.exports.create = (event, context, callback) => {
  event.Records.forEach((record) => {
    const song = record.s3.object.key;
    const params = {
      TableName: 'allsongs',
      Item: {
        songname: song
      }
    }
    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
};

//Search for a song
module.exports.search = (event, context, callback) => {
  const params = {
    TableName: 'allsongs',
    Key: {
      songname: event.pathParameters.songname,
    },
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch this song',
      });
      return;
    }
    if(result.Item == undefined)
    {
      const response = {
        statusCode: 200,
        body: JSON.stringify('This song could not found'),
      };
      callback(null, response);
    }
    else
    {
      const response = {
        statusCode: 200,
        body: JSON.stringify('This song '+result.Item.songname + ' is successfully found'),
      };
      callback(null, response);
      return;
    }
  });
};

//List all the songs
module.exports.list = (event, context, callback) => {
  const params = {
    TableName: 'allsongs',
  };
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch the songs list',
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

//Create a new playlist and add a song.
module.exports.playlist = (event, context, callback) => {
    const particulars =  JSON.parse(event.body);
    const params = {
      TableName: 'newplaylist',
      Item: {
        songname: particulars.songname,
        playlist: particulars.playlist
      }
    };
    dynamoDb.put(params, (error, result) => {
      if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not store this song.',
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify('Song is successfully added to the new playlist'),
    };
    callback(null, response);
  });

};