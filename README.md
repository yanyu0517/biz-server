# biz-server: http server and mock

[![NPM version](https://img.shields.io/npm/v/biz-server.svg)](https://www.npmjs.com/package/biz-server)
[![NPM downloads total](https://img.shields.io/npm/dt/biz-server.svg)](https://www.npmjs.com/package/biz-server)
[![NPM license](https://img.shields.io/npm/l/biz-server.svg)](https://www.npmjs.com/package/biz-server)
[![Build Status](https://travis-ci.org/yanyu0517/biz-server.svg?branch=master)](https://travis-ci.org/yanyu0517/biz-server)
[![Dependency Status](https://david-dm.org/yanyu0517/biz-server.svg)](https://david-dm.org/yanyu0517/biz-server)
[![devDependency Status](https://david-dm.org/yanyu0517/biz-server/dev-status.svg)](https://david-dm.org/yanyu0517/biz-server#info=devDependencies)
[![bitHound Overalll Score](https://www.bithound.io/github/yanyu0517/biz-server/badges/score.svg)](https://www.bithound.io/github/yanyu0517/biz-server)

biz-server是一个命令行http server，并包含了一个mock center。


[![NPM Stat](https://nodei.co/npm/biz-server.png?downloads=true)](https://nodei.co/npm/biz-server)

# 安装 #

    npm install biz-server -g 

请全局安装biz-server，并使用命令行操作

# 使用 #
## http server功能 ##

    biz-server [path] [options]

or

	bs [path] [options]

`path`：如果没有指定path，那么则认为是当前目录，推荐不指定path，使用当前目录
`options`：biz-server的http功能是基于[https://github.com/indexzero/http-server](https://github.com/indexzero/http-server "http-server")实现的，能够接受所有http-server的参数

`-p` Port to use (defaults to 8080)

`-a` Address to use (defaults to 0.0.0.0)

`-d` Show directory listings (defaults to 'True')

`-i` Display autoIndex (defaults to 'True')

`--as` be filterd ajax request suffix, comma separated  (defaults to '.action')

`-m` or `--mock` mock config path  (defaults to cwd() + /config/mockConfig])

`-e` or `--ext` Default file extension if none supplied (defaults to 'html')

`-s` or `--silent` Suppress log messages from output

`--cors` Enable CORS via the `Access-Control-Allow-Origin` header

`-o` Open browser window after starting the server

`-c` Set cache time (in seconds) for cache-control max-age header, e.g. -c10 for 10 seconds (defaults to '3600'). To disable caching, use -c-1.

`-U` or `--utc` Use UTC time format in log messages.

`-P` or `--proxy` Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com

`-S` or `--ssl` Enable https.

`-C` or `--cert` Path to ssl cert file (default: cert.pem).

`-K` or `--key` Path to ssl key file (default: key.pem).

`-r` or `--robots` Provide a /robots.txt (whose content defaults to 'User-agent: *\nDisallow: /')

`-h` or `--help` Print this list and exit.

`-v` or `--version` Print the version.

	
## mock功能 ##
step1:

    cd path

进入到希望biz-server运行的目录

step2:

	biz-server --init mock

初始化mock功能

step3:

在启动时，增加mock参数，指定mock功能的配置文件

    -m --mockmock config path  [cwd() + /config/mockConfig]

mock配置文件如下:

    {
	    "dataSource": ["template", "json"],
	    "json": {
		    "path": "/mock/data/",
		    "wrap": false
	    },
	    "template": {
	    	"path": "/mock/template/"
	    }
    }

mock配置文件请参考biz-mock

[https://github.com/yanyu0517/biz-mock#mockconfig](https://github.com/yanyu0517/biz-mock#mockconfig)

# demo #
[https://github.com/yanyu0517/biz-server/tree/gh-pages](https://github.com/yanyu0517/biz-server/tree/gh-pages)
