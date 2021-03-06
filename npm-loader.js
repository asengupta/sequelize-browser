define({
    load: function (name, rq, load, config) {
    	console.log("In generic load..." + name);
		var fullPath = config.baseUrl + "node_modules/" + name;
		if (fullPath[0] === "/") fullPath = fullPath.substring(1);
		console.log("Dependency: " + fullPath);
		console.log("Dependency resolved to : " + dependencies[fullPath]);
    	if (dependencies[fullPath]) {
    		// console.log(dependencies[fullPath]);
            // dependencies.map = [{"npm-loader": "/npm-loader"}]
    		// var loco = requires[fullPath];
            var loco = require.config(dependencies[fullPath]);
            // console.log("require() for  resolved to was: " + loco);
            // console.log("Dep " + name + " was: " + dependencies[fullPath].baseUrl);
    		loco(["require", dependencies[fullPath].main], function(reqq, value) {
                // console.log("Loading " + value);
    			load(value);
    		});
    	}
        else
        {
            console.log("SOMETHING FAILED!!!");
        }
    }
});
