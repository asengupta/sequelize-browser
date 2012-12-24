define({
    load: function (name, rq, load, config) {
    	console.log("In generic load...");
		rq([name], function(value) {
			load(value);
		});
    }
});
