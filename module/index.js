'use strict';
//var util = require('util');
var path = require('path');
var _ = require('lodash');
var Class = require('../class');

// TODO : Implement this function
var getClientModules = function () {
	return [];
};

var ModuleGenerator = Class.extend({
	constructor: function () {
		Class.apply(this, arguments);
		this.createOptions();

		this.argument('modulename', {
			type: String,
			required: false
		});
		this.modulename = this._.camelize(this._.slugify(this._.humanize(this.appname)));

	},

	initializing: function () {

	},

	prompting: function () {

		var done = this.async();

		var prompts = [{
			name: 'modulename',
			when: function () {
				return this.modulename && this.modulename.length > 0;
			},
			message: 'What is the name of your module ?',
			default: this.modulename,
			validate: function (value) {
				value = _.str.trim(value);
				if (_.isEmpty(value) || value[0] === '/' || value[0] === '\\') {
					return 'Please enter a non empty name';
				}
				if (_.contains(getClientModules(), value)) {
					return 'The module name ' + value + ' already exists';
				}
				return true;
			}
		}];

		this.prompt(prompts, function (answers) {
			this.modulename = answers.modulename;
			done();
		}.bind(this));

	},

	configuring: function () {

	},

	writing: function () {
		this.sourceRoot(path.join(__dirname, '../templates/module'));
		var targetDir = path.join('client', 'scripts', this.modulename);
		this.mkdir(targetDir);
		this.template('index.js', path.join(targetDir, 'index.js'));
	},

	end: function () {

	}
});

module.exports = ModuleGenerator;