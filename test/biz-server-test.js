var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    vows = require('vows'),
    request = require('request'),
    httpServer = require('http-server'),
    BizServer = require('../src/biz-server');

var root = path.join(__dirname, 'fixtures', 'root'),
    server8080, proxyServer, server8082;

vows.describe('biz-server').addBatch({
    'When biz-server is listening on 8080': {
        topic: function() {
            server8080 = BizServer.startServer({
                root: root,
                robots: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                port: 8080
            });
            this.callback(null, server8080);
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
            }
        },
        'when requesting non-existent file': {
            topic: function() {
                request('http://127.0.0.1:8080/404', this.callback);
            },
            'status code should be 404': function(res) {
                assert.equal(res.statusCode, 404);
            }
        },
        'when requesting /': {
            topic: function() {
                request('http://127.0.0.1:8080/', this.callback);
            },
            'should respond with index': function(err, res, body) {
                assert.equal(res.statusCode, 200);
                assert.include(body, '/file');
                assert.include(body, '/canYouSeeMe');
            }
        },
        'when robots options is activated': {
            topic: function() {
                request('http://127.0.0.1:8080/', this.callback);
            },
            'should respond with status code 200 to /robots.txt': function(res) {
                assert.equal(res.statusCode, 200);
            }
        },
        'and options include custom set http-headers': {
            topic: function() {
                request('http://127.0.0.1:8080/', this.callback);
            },
            'should respond with headers set in options': function(err, res) {
                assert.equal(res.headers['access-control-allow-origin'], '*');
                assert.equal(res.headers['access-control-allow-credentials'], 'true');
            }
        },
        'When http-server is proxying from 8081 to 8080': {
            topic: function() {
                proxyServer = BizServer.startServer({
                    proxy: 'http://127.0.0.1:8080/',
                    root: path.join(__dirname, 'fixtures'),
                    port: 8081
                });
                this.callback(null, proxyServer);
            },
            'it should serve files from the proxy server root directory': {
                topic: function() {
                    request('http://127.0.0.1:8081/root/file', this.callback);
                },
                'status code should be the enpoint code 200': function(res) {
                    assert.equal(res.statusCode, 200);
                },
                'and file content': {
                    topic: function(res, body) {
                        var self = this;
                        fs.readFile(path.join(root, 'file'), 'utf8', function(err, data) {
                            self.callback(err, data, body);
                        });
                    },
                    'should match content of the served file': function(err, file, body) {
                        assert.equal(body.trim(), file.trim());
                    }
                }
            },
            'it should fallback to the proxied server': {
                topic: function() {
                    request('http://127.0.0.1:8081/file', this.callback);
                },
                'status code should be the enpoint code 200': function(res) {
                    assert.equal(res.statusCode, 200);
                },
                'and file content': {
                    topic: function(res, body) {
                        var self = this;
                        fs.readFile(path.join(root, 'file'), 'utf8', function(err, data) {
                            self.callback(err, data, body);
                        });
                    },
                    'should match content of the proxied served file': function(err, file, body) {
                        assert.equal(body.trim(), file.trim());
                    }
                }
            }
        }
    },
    'When cors is enabled': {
        topic: function() {
            server8082 = BizServer.startServer({
                root: root,
                cors: true,
                corsHeaders: 'X-Test',
                port: 8082
            });
            this.callback(null, server8082);
        },
        'and given OPTIONS request': {
            topic: function() {
                request({
                    method: 'OPTIONS',
                    uri: 'http://127.0.0.1:8082/',
                    headers: {
                        'Access-Control-Request-Method': 'GET',
                        Origin: 'http://example.com',
                        'Access-Control-Request-Headers': 'Foobar'
                    }
                }, this.callback);
            },
            'status code should be 204': function(err, res) {
                assert.equal(res.statusCode, 204);
            },
            'response Access-Control-Allow-Headers should contain X-Test': function(err, res) {
                assert.ok(res.headers['access-control-allow-headers'].split(/\s*,\s*/g).indexOf('X-Test') >= 0);
            }
        }
    }
}).export(module);