var requirejs = require('requirejs');
requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['fs', 'underscore'], function   (fs, _) {
var top = ".";
var requires = [];

function build(currentDir) {
	var fullyQualifiedPackageJSON = currentDir + "/package.json";
	if (fs.existsSync(fullyQualifiedPackageJSON))
	{
		var packageConfig = JSON.parse(fs.readFileSync(fullyQualifiedPackageJSON, "utf8"));
		var contextualRequire =	{
				  context: packageConfig.name,
				  baseUrl: currentDir.replace("./", ""),
				  packages: [],
				  main: packageConfig.main
				};

		if (packageConfig.dependencies !== undefined && packageConfig.dependencies !== null)
		{
			contextualRequire.packages = _.map(_.keys(packageConfig.dependencies), function(dependency) {
				var name = dependency;
				var location = currentDir + "/node_modules/" + dependency;
				var dependencyPackageJSON = location + "/package.json";
				var dependencyConfig = JSON.parse(fs.readFileSync(dependencyPackageJSON, "utf8"));
				var main = dependencyConfig.main;
				return {name: name, location: location.replace("./", ""), main: main};
		    });
		}
		console.log("Building context for " + packageConfig.name);
	    requires.push(contextualRequire);
	}

	var files = fs.readdirSync(currentDir);
	var directories = _.filter(files, function(f) {
		// console.log("Looking at " + currentDir + "/" + f);
		// console.log(fs.statSync(currentDir + "/" + f));
		return fs.statSync(currentDir + "/" + f).isDirectory();
	});
	_.each(directories, function(dir) {build(currentDir + "/" + dir)});

}

build(top);
console.log(JSON.stringify(requires));
var maps = {};
_.each(requires, function(r) {maps[r.baseUrl] = r;})
fs.writeFileSync("bootstrap.js", "var dependencies = " + JSON.stringify(maps) + ";\r\nvar requires = {};");
});
