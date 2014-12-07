var Dataz = require('dataz'),
	yaml = require('js-yaml'),
	fs = require('fs');

// Helper to read file async
var readParseFile = function(d, src, fnc, opts, done) {
	fs.readFile(src, {encoding: 'utf8'}, function(err, contents) {
		if (err) {
			return done(err);
		}

		// Try parsing the yaml
		var o = {};
		try {
			o = fnc(contents, opts);
		} catch(err) {
			return done(err);
		}

		// Extend the dataz instance
		d.extend(o);
		done(null, o);
	});
};

var YamlDataz = module.exports = Dataz.extend({
	prototype: {
		safeLoad: function(src, options, done) {
			if (typeof options === 'function') {
				done = options;
				options = {};
			}
			readParseFile(this, src, yaml.safeLoad, options, done);
		},
		load: function(src, options, done) {
			if (typeof options === 'function') {
				done = options;
				options = {};
			}
			readParseFile(this, src, yaml.load, options, done);
		},
		safeLoadSync: function(src, options, done) {
			if (typeof options === 'function') {
				done = options;
				options = {};
			}
			this.extend(yaml.safeLoad(fs.readFileSync(src, {encoding: 'utf8'}), options));
		},
		loadSync: function(src, options, done) {
			if (typeof options === 'function') {
				done = options;
				options = {};
			}
			this.extend(yaml.load(fs.readFileSync(src, {encoding: 'utf8'}), options));
		},
		toYAML: function(options, unsafe) {
			return yaml[unsafe ? 'dump' : 'safeDump'](this.toJSON(), options);
		}
	}
});
