var Event = require('../models/event').Event;
var HttpError = require('../error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
	app.get('/', function(req, res, next) {
		//res.end("Test");
		res.render("index");
	});

	
	app.get('/events', function(req, res, next) {
		Event.find({}, function(err, events) {
			if (err) return next(err);
			res.json(events);
		})
	});

	app.get('/events/:id', function(req, res, next) {
		try {
			var id = new ObjectID(req.params.id);
		} catch (e) {
			console.log("catch error");
			return next(404);
		}

		Event.findById(id, function(err, event) {
			if (err) return next(err);
			if (!event) {
				console.log("hello the user is not found");
				//next(new HttpError(404, "User not found"));
				next(404);
			}
			res.json(event);
		});
	});
};

/*var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
