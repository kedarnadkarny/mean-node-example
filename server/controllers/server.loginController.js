var mongojs = require('mongojs');
var db = mongojs('mean-demo',['userdata']);
var express = require('express');
var app	   = express();
var jwt    = require('jsonwebtoken');


getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.login = function (req, res) {
    var email = req.params.email;
    var password = req.params.password;
    var authentication = getToken(req.headers);
    console.log("Authentication function: " + authentication);
    console.log("Authentication: " + req.headers);
    console.log("Request from client: Email: " + email + " Password: "+password);
    db.userdata.findOne({email: email, password: password}, function (err, doc) {
        if(doc)
        {
            var token = jwt.sign(email, 'shhhhh',{
                algorithm: 'HS256'
                },
                { expirationInMinutes: 60*1 }
            );
            var resdata={
                status:true,
                message: doc.email + " Login successful!",
                id: doc._id,
                token: token
            };
            db.userdata.update({ _id: doc._id }, { $set: {jwtid: token}});
            res.jsonp(resdata);
        }
        else {
            var resdata={status:false,
                message:'Incorrect username or password'};
            res.jsonp(resdata);
        }
    });
}

module.exports.logout = function (req, res) {
    var id = req.params.id;
    console.log("Request from client: ID: " + id);
    db.userdata.update({ "_id": mongojs.ObjectId(id)}, { $set: {"jwtid": ""}}, function (err, doc) {
        if(doc) {
            console.log(doc);
            res.jsonp(doc);
        }
        else {
            console.log(err);
            res.jsonp(err);
        }
    });
}
