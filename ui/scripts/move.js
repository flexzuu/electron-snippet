const fs = require('fs-extra');
const path = require('path');
const electronui = path.resolve('../electron/ui');
const build = path.resolve('./build');
console.log("Copy from", electronui, "to", build);
fs.ensureDir(electronui, function (err) {
  if (err) return console.error(err)
  fs.emptyDir(electronui, function (err) {
    if (err) return console.error(err)
    fs.ensureDir(build, function (err) {
      if (err) return console.error(err)
      fs.copy(build, electronui, function (err) {
        if (err) return console.error(err)
      }) // copies file
    })
  })
})
