module.exports = function(req, res, next) {
	res.sendHttpError = function(error) {
		console.log("hello from sendHttpError");
		if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
			console.log("ajax");
			res.json(error);
		} else {
			console.log("render error page");
			res.render("error", {error: error});
		}
	};
	next();	
}