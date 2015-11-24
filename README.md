# biz-server: http server and mock

[![Build Status](https://travis-ci.org/yanyu0517/biz-server.svg?branch=master)](https://travis-ci.org/yanyu0517/biz-server)

biz-server是一个命令行http server，并包含了一个mock center。

# 安装 #

    npm install biz-server -g 

请全局安装biz-server，并使用命令行操作

# 使用 #
## http server功能 ##


    biz-server [path] [options]
如果没有指定path，那么则认为是当前目录

推荐不指定path，使用当前目录

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

json和template路径与请求路径一致，例：

请求:/query/table.action

json路径/mock/data/query/table.json

template路径/mock/data/query/table.template

### 如何自定义mock数据源 ###

mock数据源实现getData方法

    exports.getData = function(url){
    	return data
    }

方法参数：

- url：请求数据路径

方法返回：

- json数据

另外需要在config/mockConfig.json的dataSource注册mock数据源

# demo #
[https://github.com/yanyu0517/biz-server/tree/gh-pages](https://github.com/yanyu0517/biz-server/tree/gh-pages)
