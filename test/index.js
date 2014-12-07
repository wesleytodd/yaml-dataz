var YamlDataz = require('../'),
	assert = require('assert'),
	fs = require('fs'),
	path = require('path');

describe('YamlDataz', function() {

	var d;
	beforeEach(function() {
		d = new YamlDataz();
	});

	it('should load a yaml file asyncronusly', function(done) {
		d.safeLoad(path.join(__dirname, './mock.yml'), function(err) {
			if (err) {
				console.error('error', err);
				throw err;
			}
			assert.equal(d.get('invoice'), 34843);
			assert.equal(d.get('product:0:quantity'), 4);
			assert.equal(d.get('product:1:quantity'), 1);
			assert(d.get('date') instanceof Date);
			done();
		});
	});

	it('should load a yaml file syncronously', function() {
		d.safeLoadSync(path.join(__dirname, './mock.yml'));
		assert.equal(d.get('invoice'), 34843);
		assert.equal(d.get('product:0:quantity'), 4);
		assert.equal(d.get('product:1:quantity'), 1);
		assert(d.get('date') instanceof Date);
	});

	it('should export to yaml', function() {
		d.set('foo', 'bar');
		d.set('baz:bar', 'fab');
		assert.equal(d.toYAML(), [
			'foo: bar',
			'baz:',
			'  bar: fab\n'
		].join('\n'));
	});

});

