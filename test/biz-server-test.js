var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    vows = require('vows'),
    request = require('request'),
    httpServer = require('http-server'),
    bizServer = require('../src/biz-server');

var root = path.join(__dirname, 'fixtures', 'root'),
    server;

vows.describe('biz-server').addBatch({
    'When biz-server is listening on 8080': {
        topic: function() {
            server = bizServer.startBizServer({
                root: root,
                robots: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                port: 8080
            });
            this.callback(null, server);
        },
        'it should serve files from root directory': {
            topic: function() {
                request('http://127.0.0.1:8080/file', this.callback);
            },
            'status code should be 200': function(res) {
                assert.equal(res.statusCode, 200);
            },
            'and file content': {
                topic: function(res, body) {
                    var self = this;
                    fs.readFile(path.join(root, 'file'), 'utf8', function(err, data) {
                        self.callback(err, data, body);
                    });
                },
                'should match content of served file': function(err, file, body) {
                    assert.equal(body.trim(), file.trim());
                }
            },
            treadown: function() {
                // server.close();
            }
        }
    }

    // 'When cors is enabled': {
    //   topic: function () {
    //     var server = httpServer.createServer({
    //       root: root,
    //       cors: true
    //     });
    //     server.listen(8082);
    //     this.callback(null, server);
    //   },
    //   'and given OPTIONS request': {
    //     topic: function () {
    //       request({
    //         method: 'OPTIONS',
    //         uri: 'http://127.0.0.1:8082/',
    //         headers: {
    //           'Access-Control-Request-Method': 'GET',
    //           Origin: 'http://example.com',
    //           'Access-Control-Request-Headers': 'Foobar'
    //         }
    //       }, this.callback);
    //     },
    //     'status code should be 204': function (err, res) {
    //       assert.equal(res.statusCode, 204);
    //     }
    //   }
    // }
}).export(module);