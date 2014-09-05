/*

Transform (invert) <real>0.25</real> to <real>0.75</real> (the inverse) with this file:
https://gist.github.com/luan/6362811

the beginning of which looks like:

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Ansi 0 Color</key>
	<dict>
		<key>Blue Component</key>
		<real>0.20179691910743713</real>
		<key>Green Component</key>
		<real>0.1818026602268219</real>
		<key>Red Component</key>
		<real>0.1665644645690918</real>
	</dict>

How to use?

$ cat examples/Hybrid.itermcolors | node invert-itermcolors.js > examples/Hybrid-light.itermcolors

*/
var Transform = require('stream').Transform;

var parser = new Transform();
parser._transform = function(data, encoding, done) {
  var lines = data.toString().split('\n');
  var that = this;
  var background = false;
  lines.forEach(function(line) {
    var color = line.match(/<key>(.*) Color<\/key>/);
    if (color) {
      background = (color[1] === 'Background');
    }
    var real = line.match(/^(.*<real>)([0-9.]*)(<\/real>.*)$/);
    if (real) {
      var inversed = 1 - parseFloat(real[2]);
      var darkened = Math.max(inversed - 0.3, 0);
      line = real[1] + (background ? inversed : darkened) + real[3];
    }
    that.push(line + '\n');
  });
  done();
};

// pipe it all up baby
process.stdin.pipe(parser).pipe(process.stdout);