'use strict';

var Mock = require('mockjs'),
    fs = require('fs'),
    path = require('path');

function Mock(options){
    this.options = options || {};


}

Mock.prototype.mock(){

}

Mock.prototype.getJsonData = function(url) {
    var pathStr = path.join(process.cwd(), mockConfig.json.path + url + (mockConfig.json.suffix || '.json'));
    if (fs.existsSync(pathStr)) {
        var data = fs.readFileSync(pathStr, 'utf-8'),
            json = JSON.parse(data);
        if (mockConfig.json.wrap) {
            if (json.enable) {
                return JSON.stringify(json[json.value]);
            }
        } else {
            return data;
        }
    }
};

Mock.prototype.getTemplateData = function(url) {
    // body...
};