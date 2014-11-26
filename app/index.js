'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var CcGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'create a cc for tagtoo!'
    ));

    var prompts = [{
      type: 'input',
      name: 'ccName',
      message: 'what is the cc name? ad_own_',
      default: 'yellow_300x250'
    },{
      type: "checkbox",
      name: "includeModule",
      message: "Which module do you want to include?",
      choices: [
        {
          name: "basic",
          value: "basic"
        }, {
          name: "house",
          value: "house"
        }, {
          name: "people",
          value: "people"
        }, {
          name: "google",
          value: "google"
        }
      ]
    },{
      type: "confirm",
      name: "addJs",
      message: "Would you like to create custom event?(Will create a .js file)",
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.ccName = props.ccName;
      this.includeModule = props.includeModule;
      this.addJs = props.addJs;

      done();
    }.bind(this));
  },

  projectfiles: function () {
    var adName = 'apps/campaign_creater/templates/layouts/ad_own_'+this.ccName+'.html';
    var layoutName = 'apps/campaign_creater/templates/ad/layout/layout_own_'+this.ccName+'.html';
    var scssName = 'apps/campaign_creater/static/ad/sass/ad_own/ad_own_'+this.ccName+'.scss';
    var jsName = 'apps/campaign_creater/static/ad/js/ad_own/ad_own_'+this.ccName+'.js';

    //var cmp = ['basic', 'house', 'people', 'google'];
    var basic = '{% from "modules/_basic.html" import basic_CSS, basic_JS, common_JS %}';
    var house = '{% from "modules/_house.html" import house_CSS, house_JS %}';
    var people = '{% from "modules/_people.html" import people_CSS, people_JS %}';
    var google = '{% from "modules/_google.html" import google_CSS, google_JS %}';
    var context = {
      basic: basic, house: house, people: people, google: google
    };
    var res = {
      basic: "", house: "", people: "", google: ""
    };

    for (var key in context) {
      for(var j = 0;j < this.includeModule.length; j++) {
        if(this.includeModule[j] == key) {
          res[key] = context[key];
          console.log(res);
        }
      }
    }
    // function check(value, index, ar) {
    //     var cmp = ['basic', 'house', 'people', 'google'];
    //     if(cmp.indexOf(value) != -1) {

    //     };
    // }
    // this.includeModule.some(check);

    this.template('_ad_own_yellow_300x250.html', adName, res);
    this.copy('_layout_own_yellow_300x250.html', layoutName);
    this.copy('_ad_own_yellow_300x250.scss', scssName);
    if(this.addJs) {
      this.copy('_ad_own_horizontal_style1.js', jsName);
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = CcGenerator;
