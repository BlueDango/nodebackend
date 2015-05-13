import express = require('express');
import mongodb = require('mongodb');

var MyMongoClient = mongodb.MongoClient;
var mongoUrl: string = 'mongodb://localhost:27017/test';

export class Router {
    showData(res: express.Response) {
        MyMongoClient.connect(mongoUrl, function (err, db) {
            _getAllMessages(db, function (entries) {
                db.close();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(entries));
            });
        });
    }

    submitData(s: string, res: express.Response) {
        MyMongoClient.connect(mongoUrl, function (err, db) {
            _insertMessage(db, s, function () {
                db.close();
                res.end(s + " was submitted");
            });
        });
    }

    clearData(res: express.Response) {
        MyMongoClient.connect(mongoUrl, function (err, db) {
            _removeAllMessages(db, function () {
                db.close();
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Data cleared!");
            });
        });
    }
};

function _getAllMessages(db: mongodb.Db, callback: Function) {
    var cursor = db.collection('messages').find();
    var entry = [];
    cursor.each(function (err, doc) {
        if (doc != null) {
            entry.push(doc);
        } else {
            callback(entry);
        }
    });
};

function _insertMessage(db, entry: String, callback: Function) {
    db.collection('messages').insertOne(entry, function (err, result) {
        console.log("Inserted " + entry);
        callback(result);
    });
};

function _removeAllMessages(db, callback) {
    db.collection('messages').deleteMany({},
        function (err, results) {
            console.log(results);
            callback();
        });
}