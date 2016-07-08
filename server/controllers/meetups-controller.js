var Meetup = require('../models/meetup');
var mongojs = require('mongojs');
var db = mongojs('mean-demo',['meetups']);

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

module.exports.create = function (req, res) {
    var meetup = new Meetup(req.body);
    meetup.save(function (err, result) {
        res.json(result);
    });
}

module.exports.list = function (req, res) {
	Meetup.find({}, function(err, results) {
		res.json(results);
	});
}

module.exports.delete = function (req, res) {
    var id = req.params.id;
    console.log(id);
	db.meetups.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
}

module.exports.getOne = function (req, res) {
    var id = req.params.id;
    console.log("Request from client: "+id);
    db.meetups.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
}

module.exports.update = function (req, res) {
    var name = req.params.name;
    var id = req.params.id;
    console.log("Request from client: Name: "+name+ " ID: "+id);
    db.meetups.update({ _id: mongojs.ObjectId(id) }, { $set: {name: name}});

    var token = getToken(req.headers);

    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {

            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
}