# biz-server: http server and mock

[![NPM version](https://img.shields.io/npm/v/biz-server.svg)](https://www.npmjs.com/package/biz-server)
[![NPM downloads total](https://img.shields.io/npm/dt/biz-server.svg)](https://www.npmjs.com/package/biz-server)
[![NPM license](https://img.shields.io/npm/l/biz-server.svg)](https://www.npmjs.com/package/biz-server)
[![Build Status](https://travis-ci.org/yanyu0517/biz-server.svg?branch=master)](https://travis-ci.org/yanyu0517/biz-server)
[![Dependency Status](https://david-dm.org/yanyu0517/biz-server.svg)](https://david-dm.org/yanyu0517/biz-server)
[![devDependency Status](https://david-dm.org/yanyu0517/biz-server/dev-status.svg)](https://david-dm.org/yanyu0517/biz-server#info=devDependencies)

biz-server是一个命令行http server，并包含了一个mock center。

# 安装 #

    npm install biz-server -g 

请全局安装biz-server，并使用命令行操作

# 使用 #
## http server功能 ##

    biz-server [path] [options]

or

	bs [path] [options]

`path`：如果没有指定path，那么则认为是当前目录，推荐不指定path，使用当前目录
`options`：biz-server的http功能是基于[https://github.com/indexzero/http-server](https://github.com/indexzero/http-server "http-server")实现的，能够接受所有http-serverde参数

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

### mock数据源 ###

目前提供了两种数据源;

1.json

json是静态数据源

    "json": {
    	"path": "/mock/data/",
   		"wrap": false
    }

path：静态数据源文件目录

wrap，数据外层是否被包裹（兼容处理）

包裹格式：

    {
	    "enabled": true,
	    "value": "success",
	    "success": {}
    }
2.template

template是通过数据模板生成模拟数据

生成器选用[http://mockjs.com/](http://mockjs.com/ "Mock.js")

3.cookies

cookies是通过在配置文件中拷贝cookies，实现免登陆直接请求数据

配置文件如下：

    "cookies": {
	    "host": ,
	    "rejectUnauthorized": ,
	    "secureProtocol": ,
	    "cookies": 
    }

- host：访问域名，支持http和https
- reject


json和template路径与请求路径一致，例：

请求:/query/table.action

json路径/mock/data/query/table.json

template路径/mock/data/query/table.template

### 如何自定义mock数据源 ###

mock数据源实现getData方法

    exports.getData = function(action, req, res, cb){
    	return data
    }

方法参数：

- action：请求数据路径
- req: request
- res: response
- cb: biz-server采用co控制异步操作的流程，自定义数据源会被thunkify，cb是co的回调函数，`cb(error, data)`

方法返回：

- json数据

另外需要在config/mockConfig.json的dataSource注册mock数据源

# demo #
[https://github.com/yanyu0517/biz-server/tree/gh-pages](https://github.com/yanyu0517/biz-server/tree/gh-pages)
