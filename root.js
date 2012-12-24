if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log("Great success! All the File APIs are supported.");
} else {
  alert('The File APIs are not fully supported in this browser.');
}

require(["node_modules/underscore/index"], function(_) {
  _.each(_.keys(dependencies), function(k) {
    requires[k] = require.config(dependencies[k]);
  });
  console.log("Deps are....");
  console.log(dependencies);
});
process = {version: "v0.8", on: function(ev) {console.log("Ignoring event registration...");}};
// var models = require("./models/all");
var handles = {};

var requireApp = require.config({
  context: "app",
  baseUrl: "/",
  map: [
  		{"npm": "/npm-loader"},
  		// {"sequelize-loader": "/sequelize-loader"}
  	   ]
});

// requireSequelize(["require", "index"], function(req1, q1, Sequelize) {
//   console.log("Completed loading Sequelize");
//   requireApp(["require", "src/models/book"], function(req2, models) {
//     console.log("Loaded models");
//   });
// });

requireApp(["require", "src/models/all", "npm-loader!sequelize-port"], function(req2, models, Sequelize) {
  console.log("Loaded models");
  console.log(models);
  var seq = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
  var chainer = new Sequelize.Utils.QueryChainer();
  chainer.add(models.Page.create({id: 42, pageSrc: "sdsd", pageTitle: "sedsd", pageNumber: 2}));
  chainer.add(models.Note.create({id: 69, comments: "ABCD"}));
  chainer.run().success(function(results) {
    console.log(results);
    results[0].setNote(results[1]);
  });
  models.Content.tocSpine("blah", "wah");
});

var config = 
{
	db:
	{
		"development":
		{
	        "username": "root",
	        "password": null,
	        "database": "reader",
	        "host": "127.0.0.1",
	        "logging": true
    	},
	}
};


// var seq = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
// var chainer = new Sequelize.Utils.QueryChainer();

// seq.sync({force: true}).on("success", function() {
// 	chainer.add(models.Page.create({id: 42, pageSrc: "sdsd", pageTitle: "sedsd", pageNumber: 2}));
// 	chainer.add(models.Note.create({id: 69, comments: "ABCD"}));
// 	chainer.run().success(function(results) {
// 		console.log(results);
// 		results[0].setNote(results[1]);
// 	});
// });
