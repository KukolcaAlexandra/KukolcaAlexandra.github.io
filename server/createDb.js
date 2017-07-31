var mongoose = require('./lib/mongoose');
mongoose.set('debug', true);
var async = require('async');
//var User = require('./models/user').User;

mongoose.Promise = require('bluebird');

async.series([
	open,
	dropDatabase,
	requireModels,
	createEvents	
], function(err, results){
	console.log(arguments);
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('./models/event');

	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createEvents(callback) {
	require('./models/event');
	var events = [
		{	type: 'event', 
			title: 'est', 
			start: '2017-02-13T12:51:24Z', 
			speakers: [
				'5915c02989e1e8ac13de821a',
				'5915c02989e1e8ac13de826b',
				'5915c02989e1e8ac13de81f4'
			],
			resources: [
				{
					"type": "aliqua",
					"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
					"description": "Occaecat duis Lorem velit magna esse sint dolore qui. Qui do officia sint in elit cupidatat qui voluptate cillum. Mollit occaecat consectetur magna velit nisi sunt cupidatat amet laborum magna et magna anim. Ut eu cillum nulla elit aliqua amet sunt cupidatat nisi aliquip dolor officia.\r\n"
				},
				{
					"type": "exercitation",
					"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
					"description": "Consectetur dolore excepteur adipisicing ex mollit excepteur ex labore non ex in. Commodo ex enim esse eiusmod id. Laboris nulla veniam aliquip ullamco id cillum est eiusmod excepteur consectetur laboris magna voluptate. Magna nulla veniam voluptate eu ut. Dolore laboris tempor ut tempor sit et nostrud. Enim ad minim id mollit.\r\n"
				},
				{
					"type": "reprehenderit",
					"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
					"description": "Dolore magna deserunt eu enim enim aliqua. Incididunt excepteur enim enim esse pariatur. Veniam ad occaecat consequat sit pariatur et tempor cillum Lorem velit est velit.\r\n"
				}
			],
			location: '812 Wilson Avenue, Woodlake, New Jersey, 4743',
			duration: 4934951,
			description: 'Id laboris eiusmod est do dolore laboris pariatur dolor minim consequat.\r\n'
		},
		{	type: 'deadline', 
			title: 'exercitation', 
			start: '2017-01-20T03:22:14Z', 
			speakers: [
				'5915c02989e1e8ac13de818d',
				'5915c02989e1e8ac13de8214'
			],
			resources: [
				{
				"type": "est",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Ea elit nulla nisi amet. Occaecat aliqua eiusmod pariatur velit aute velit reprehenderit. Ut fugiat amet veniam culpa non excepteur excepteur fugiat mollit proident nostrud aliquip cillum.\r\n"
				},
				{
				"type": "reprehenderit",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Id esse mollit irure eiusmod. Magna consequat labore nisi voluptate do est aliqua nisi nostrud elit ullamco. Excepteur commodo esse officia fugiat Lorem.\r\n"
				},
				{
				"type": "in",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Ad qui mollit irure ad velit. Adipisicing exercitation dolore ipsum sint laborum quis adipisicing non. Anim duis ullamco eu anim minim adipisicing. Cupidatat laborum mollit id eu. Aute laborum occaecat anim anim voluptate laboris.\r\n"
				},
				{
				"type": "cupidatat",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Do ex do eu veniam anim eu consequat anim. Culpa proident mollit id sit consequat mollit laboris pariatur in eu. Officia ex anim Lorem minim consectetur excepteur exercitation cillum sit sunt ea ea anim. Deserunt ea tempor mollit excepteur Lorem tempor. Incididunt eiusmod exercitation reprehenderit pariatur ipsum et deserunt Lorem eu occaecat.\r\n"
				},
				{
				"type": "ad",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Officia irure consequat eu adipisicing aliqua. Ipsum nisi tempor deserunt eu dolore laborum exercitation laborum voluptate aliqua. Quis in id sunt velit minim aliquip culpa. Est reprehenderit reprehenderit elit et nulla ea excepteur laboris.\r\n"
				}
			],
			location: '895 Dorchester Road, Richmond, Arizona, 6676',
			duration: 18468782,
			description: 'Sunt do commodo amet qui minim nostrud in nostrud voluptate dolor aliqua mollit. Sunt qui et eu ut est ipsum aute reprehenderit ut. Laboris duis anim magna occaecat ea qui consectetur incididunt mollit tempor. Sit aliquip ad ea veniam incididunt elit duis labore adipisicing sit velit est ex. Dolore exercitation consequat ad anim dolore pariatur eu eu enim labore ullamco tempor consequat laborum. Pariatur cupidatat eu tempor qui eiusmod cillum pariatur aute proident. Labore ipsum proident quis ad.\r\n'
		},
		{	type: 'webinar', 
			title: 'anim', 
			start: '2017-05-29T06:25:25Z', 
			speakers: [
				'5915c02989e1e8ac13de81e9',
				'5915c02989e1e8ac13de82df',
				'5915c02989e1e8ac13de8330'
			],
			resources: [
				{
				"type": "velit",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Magna dolore proident eiusmod mollit consectetur eu culpa adipisicing ipsum ad ullamco. Non officia ipsum ut qui fugiat mollit. Minim labore officia veniam enim nisi minim veniam culpa magna eu adipisicing reprehenderit. Tempor fugiat reprehenderit amet velit aute elit. Velit deserunt consectetur aute in quis. Labore officia ex laboris adipisicing dolor labore labore.\r\n"
				},
				{
				"type": "reprehenderit",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Id minim ullamco irure laborum quis nisi quis esse aliquip deserunt id consectetur minim. Non amet cillum nostrud aliquip do ipsum laboris dolore mollit eiusmod commodo cupidatat nulla cupidatat. Consectetur esse Lorem officia consectetur nisi minim nisi cupidatat dolor do.\r\n"
				},
				{
				"type": "ad",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Velit qui officia magna proident et adipisicing eu. Consectetur cillum ut amet nulla. Nostrud ad anim fugiat magna adipisicing irure in laborum id excepteur id dolore do officia. Veniam veniam qui officia voluptate aute adipisicing et. Elit aute eu aute quis et dolore ea minim dolore in ullamco. Tempor enim dolor deserunt tempor aute officia pariatur sit eiusmod consectetur ipsum non magna.\r\n"
				},
				{
				"type": "ad",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Veniam pariatur et eiusmod velit labore elit laboris culpa ea ea id. Ex proident eu duis sint laborum adipisicing esse velit. Non ullamco ad in dolor est anim. Labore reprehenderit ea Lorem ex reprehenderit pariatur amet laborum sunt commodo dolore ea eiusmod. Nulla nisi aliqua fugiat ipsum dolor aliqua Lorem voluptate. Irure incididunt aliqua eiusmod non et eu ullamco enim laboris laborum anim mollit. Ullamco dolor duis aliqua tempor id cillum ipsum aliqua reprehenderit laborum anim reprehenderit elit.\r\n"
				},
				{
				"type": "quis",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Fugiat fugiat laboris commodo non esse commodo veniam dolor commodo qui culpa pariatur nostrud. Est incididunt laboris magna nisi deserunt excepteur velit. Laboris adipisicing consequat esse aliquip duis est sit consequat dolore.\r\n"
				},
				{
				"type": "sunt",
				"resource": "https://docs.mongodb.com/v3.2/reference/method/db.collection.insertMany/",
				"description": "Culpa qui consequat anim culpa amet aliquip do non irure est. Reprehenderit dolore excepteur adipisicing elit in commodo aliqua eiusmod culpa aliquip aliquip ut quis. Officia do exercitation elit aliquip quis elit.\r\n"
				}
			],
			location: '613 Fleet Place, Sparkill, American Samoa, 3008',
			duration: 26759543,
			description: 'Excepteur esse elit irure excepteur laboris nisi enim aliqua eu. Esse tempor est dolore aliqua. Lorem aute consectetur veniam aliqua dolor enim velit qui reprehenderit ad velit. Commodo enim aliquip ipsum adipisicing consectetur Lorem enim velit ea dolore ea incididunt dolore dolore. Anim deserunt tempor non tempor eu reprehenderit officia mollit ex commodo. Proident nostrud exercitation est ullamco cillum ut.\r\n'
		}
	];

	async.each(events, function(data, callback) {
		var event = new mongoose.models.Event(data);
		event.save(callback);
	}, callback);
	/*async.parallel([
		function(callback) {
			//console.log('Vasya');
			var vasya = new User({username: 'Vasya', password: 'supervasya'});
			vasya.save(function(err) {
				//console.log('Vasya');
				callback(err, vasya);
			});
		},
		function(callback) {
			//console.log('Petya');
			var petya = new User({username: 'Petya', password: '123'});
			//console.log(petya);
			petya.save(function(err) {
				//console.log('Petya');
				callback(err, petya);
			});
		},
		function(callback) {
			//console.log('Admin');
			var admin = new User({username: 'admin', password: 'admin'});
			admin.save(function(err) {
				//console.log('Petya');
				callback(err, admin);
			});
		}
	], callback);*/
}

function close(callback) {
	mongoose.disconnect(callback);
}

/*	var db = mongoose.connection.db;
	//console.log("db = " + db.dropDatabase);
	db.dropDatabase(function(err) {
		if (err) throw err;

		async.parallel([
			function(callback) {
				console.log('Vasya');
				var vasya = new User({username: 'Vasya', password: 'supervasya'});
				vasya.save(function(err) {
					console.log('Vasya');
					callback(err, vasya);
				});
			},
			function(callback) {
				console.log('Petya');
				var petya = new User({username: 'Petya', password: '123'});
				console.log(petya);
				petya.save(function(err) {
					console.log('Petya');
					callback(err, petya);
				});
			},
			function(callback) {
				console.log('Admin');
				var admin = new User({username: 'admin', password: 'admin'});
				admin.save(function(err) {
					console.log('Petya');
					callback(err, admin);
				});
			},
			function(callback) {
        		setTimeout(function() {
        	    	callback(null, 2);
        		}, 100);
    		}
		], function(err, results) {
			console.log(arguments);
			console.log('OK');
			mongoose.disconnect();
		});

		

		console.log("after parallel");
		//mongoose.disconnect();
	});
});*/

//console.log(mongoose.connection.readyState);


/*var user = new User({
	username: "Tester",
	password: "secret"
});

user.save(function(err, user, affected) {
	if(err) throw err;
	//console.log(arguments);

	User.findOne({username: "Tester"}, function(err, tester) {
		console.log(tester);
	})
});*/