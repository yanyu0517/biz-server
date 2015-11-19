'use strict';

var MockJs = require('mockjs'),
    fs = require('fs'),
    path = require('path'),
    director = require('director'),
    co = require('co'),
    thunkify = require('thunkify'),
    router = new director.http.Router();

function Mock(options) {
    this.options = options || {};
    this.initRouter();

    this.getData = thunkify(this.getMockData);
}

//init router
Mock.prototype.initRouter = function() {
    var as = this.options.as || '',
        mockConfig = this.options.mockConfig;
    //router action
    if (typeof as == 'string') {
        var suffix = as.split(',')
        for (var i = 0; i < suffix.length; i++) {
            var reg = '/(.*)' + suffix[i],
                me = this;
            router.post(new RegExp(reg), function(url) {
                if (mockConfig) {
                    me.mockTo.call(me, url, this.req, this.res)
                }
            });
        };
    }
}

Mock.prototype.dispatch = function(req, res) {
    return router.dispatch(req, res);
}

Mock.prototype.mockTo = function(url, req, res) {
    var me = this;
    co(function*() {
        for (var i = 0; i < me.options.mockConfig.dataSource.length; i++) {
            var result = yield me.getData(me.options.mockConfig.dataSource[i], url, req, res);
            if (result) {
                break;
            } else if (!result && i == me.options.mockConfig.dataSource.length - 1) {
                //最后一个仍然没有返回数据，那么则返回404
                res.writeHead(404);
                res.end('not found');
            }
        };
        me.options.logger.info('Datasource is ' + me.options.mockConfig.dataSource[i]);
    }).catch(function(err) {
        res.writeHead(404);
        res.end(err.stack);
        me.options.logger.request(req, res, err)
    });
}

Mock.prototype.getMockData = function(type, url, req, res, cb) {
    var result = false;
    switch (type) {
        case 'json':
            var data = this.getJsonData(url);
            if (typeof data != 'undefined') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(data);
                this.options.logger.request(req, res);
                result = true;
            }
            break;
        case 'online':
            break;
        case 'template':
            var data = this.getTemplateData(url);
            if (typeof data != 'undefined') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(data);
                this.options.logger.request(req, res);
                result = true;
            }
            break;
    }
    cb(null, result);
};


Mock.prototype.getJsonData = function(url) {
    var pathStr = path.join(process.cwd(), this.options.mockConfig.json.path + url + (this.options.mockConfig.json.suffix || '.json'));
    this.options.logger.info('Json data path is ' + pathStr);
    if (fs.existsSync(pathStr)) {
        var data = fs.readFileSync(pathStr, 'utf-8'),
            json = JSON.parse(data);
        if (this.options.mockConfig.json.wrap) {
            if (json.enable) {
                return JSON.stringify(json[json.value]);
            }
        } else {
            return data;
        }
    } else {
        this.options.logger.info("Can't find json data with the path '" + pathStr + "'")
    }
};

Mock.prototype.getTemplateData = function(url) {
    var pathStr = path.join(process.cwd(), this.options.mockConfig.template.path + url + '.template');
    this.options.logger.info('Template data path is ' + pathStr);
    if (fs.existsSync(pathStr)) {
        var template = fs.readFileSync(pathStr, 'utf-8'),
            data = MockJs.mock(new Function('return ' + template)());
        return JSON.stringify(data);
    } else {
        this.options.logger.info("Can't find template data with the path '" + pathStr + "'")
    }
};

module.exports = Mock;