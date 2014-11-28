'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var ccGenerator = yeoman.generators.Base.extend({

    constructor: function () {
      yeoman.generators.Base.apply(this, arguments);

      // This makes `appname` a required argument.
      this.argument('appname', { type: String, required: false });
      // And you can then access it later on this way; e.g. CamelCased
      this.appname = this._.camelize(this.appname);
    },

    initializing: function() {
        this.pkg = require('../package.json');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Create A CC Template For Tagtoo!'
        ));

        var prompts = [{
            type: 'input',
            name: 'ccName',
            message: 'what is the cc name? ad_own_',
            store: true,
            default: 'yellow_300x250'
        }, {
            type: "checkbox",
            name: "includeModule",
            message: "Which module do you want to include?",
            store: true,
            choices: [{
                name: "basic",
                value: "basic",
                checked: true
            }, {
                name: "house",
                value: "house",
                checked: true
            }, {
                name: "people",
                value: "people",
                checked: true
            }, {
                name: "google with thumbnail",
                value: "google",
                checked: true
            }, {
                name: "google",
                value: "google",
                checked: false
            }]
        }, {
            type: "confirm",
            name: "addJs",
            message: "Would you like to create custom event?(Will create a .js file)",
            store: true,
            default: false
        }];

        this.prompt(prompts, function(props) {
            this.ccName = props.ccName;
            this.includeModule = props.includeModule;
            this.addJs = props.addJs;

            done();
        }.bind(this));
    },

    projectfiles: function() {
        var adName = 'apps/campaign_creater/templates/layouts/ad_own_' + this.ccName + '.html';
        var layoutName = 'apps/campaign_creater/templates/ad/layout/layout_own_' + this.ccName + '.html';
        var scssName = 'apps/campaign_creater/static/ad/sass/ad_own/ad_own_' + this.ccName + '.scss';
        var jsName = 'apps/campaign_creater/static/ad/js/ad_own/ad_own_' + this.ccName + '.js';
        var res = {};
        var context = {
            basic: '{% from "modules/_basic.html" import basic_CSS, basic_JS, common_JS %}',
            house: '{% from "modules/_house.html" import house_CSS, house_JS %}',
            people: '{% from "modules/_people.html" import people_CSS, people_JS %}',
            google: '{% from "modules/_google.html" import google_CSS, google_JS %}'
        };

        // for (var key in context) {
        //     for (var j = 0; j < this.includeModule.length; j++) {
        //         if (this.includeModule[j] == key) {
        //             res[key] = context[key];
        //         }
        //     }
        // }

        for (var i = 0; i<this.includeModule.length;i++) {
            res[this.includeModule[i]] = context[this.includeModule[i]]
        }
        res['name'] = this.ccName;
        res['thumbnail'] = this.ccName;

        this.template('_default.html', adName, res);
        this.copy('_layout_default.html', layoutName);
        this.copy('_default.scss', scssName);
        if (this.addJs) {
            this.copy('_default.js', jsName);
        }
    },

    end: function() {
        // this.installDependencies();
    }
});

module.exports = ccGenerator;
