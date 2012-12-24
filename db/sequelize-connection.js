define(["npm-loader!sequelize-port"], function(Sequelize) {
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

	var x = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
	console.log("Completed loading everything");
	return {connection: x, Sequelize: Sequelize};
});
