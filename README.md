# biz-server demo

biz-server整合biz-ui

## demo说明

demo以biz-ui为基础，演示了如何通过biz-server启动web服务，并使用mock功能模拟左侧树的数据以及右侧列表数据

在biz-ui/目录下，已经通过bs --init mock自动生成了cofing目录，以及mock目录

在/cofing/mockConfig.json中定义的数据源顺序：

    "dataSource": ["template", "json", "cookies"]


1.左侧树数据获取
在/mock/data/目录下，根据左侧树请求/query/tree.action定义了query/tree.json作为静态json数据源
    
    {
	    "tree": [
		    {
			    "id": 100,
			    "text": "Dashbord",
			    "icon": false
		    },
		    {
			    "id": 200,
			    "text": "Consumption",
			    "icon": false,
			    "children": [
				    {"id": 210, "text": "PC"},
				    {"id": 220, "text": "Mobile"}
		    	],
		   		"state": {"opened": true}
		    },
		    {
			    "id": 300,
			    "text": "Report",
			    "icon": false,
			    "children": [
				    {"id": 310, "text": "Daily"},
				    {"id": 320, "text": "Weekly"},
				    {"id": 330, "text": "Monthly"}
			    ]
		    },
		    {
			    "id": 400,
			    "text": "Settings",
			    "icon": false,
			    "children": [
				    {"id": 410, "text": "Profile"},
				    {"id": 420, "text": "Security"}
			    ]
		    }
	    ]
    }


2.右侧列表数据获取
在/mock/template/目录下，根据右侧列表请求/query/table.action定义了query/table.template作为mock模板

    {
	    'table|1-10': [
		    {
			    'id|100-1000': 100,
			    'name|1': ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
			    'height|50-300': 50,
			    'weight|50-100.1-10': 50,
			    'age|1-100': 1,
			    'email': '@EMAIL'
		    }
	    ]  
    }


## demo演示

step1

安装biz-server

    npm install biz-server -g

step2

download demo 

[https://github.com/yanyu0517/biz-server/archive/gh-pages.zip](https://github.com/yanyu0517/biz-server/archive/gh-pages.zip "demo zip")

step3

进入biz-ui目录

    cd biz-ui

step4

启动biz-server

    bs

step5

浏览器访问

[localhost:8080/quickview](localhost:8080/quickview)
