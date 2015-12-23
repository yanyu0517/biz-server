'use strict';

var mock = require('biz-mock'),
    httpServer = require('http-server'),
    path = require('path'),
    extend = require('extend');

function startServer(options, callback) {
    var me = this,
        mockConfig,
        port,
        server,
        configs = extend(true, {
            before: [
                function(req, res) {
                    if (mockConfig) {
                        var found = mock.dispatch(req, res);
                        if (!found) {
                            res.emit('next');
                        }
                    } else {
                        res.emit('next');
                    }
                }
            ]
        }, options || {}),
        mockPath = path.join(process.cwd(), configs.root || '', configs.m || '/config/mockConfig.json');
    try {
        mockConfig = require(mockPath);
    } catch (e) {

    }
    //只有有mock配置文件，才执行mock功能
    if (mockConfig) {
        mock.start({
            as: configs.as || '.action',
            mockConfig: mockConfig,
            root: configs.root
        });
    }
    console.log(configs)
    server = httpServer.createServer(configs);
    server.listen(configs.port, configs.host || '0.0.0.0', callback);

    return server;
}

function initFolder() {
    mock.initFolder();
}


exports.startServer = startServer;
exports.initFolder = initFolder;
exports.version = require('../package.json').version;