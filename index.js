connect = require('connect')

console.log(__dirname);
server = connect.createServer(
    connect.favicon()
  , connect.logger()
  , connect.static(__dirname)
).listen(9797);
