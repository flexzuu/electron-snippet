var fs = require('fs-extra');
var path = require('path');

fs.emptyDir(path.electronui, function (err) {
  if (!err) console.log('success!')
})
