var express = require("express");
var formidable = require('formidable');
var fs = require("fs");

//创建app
var app = express();


//路由表
app.post("/api" , function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
      	var filterobj = JSON.parse(fields.filter);
      	console.log(filterobj);

      	//读取文件，相当于读取数据库
      	fs.readFile("./database/database.json",function(err,data){
                  //现在这个arr是50项，我们需要让它过筛子
      		var arr = JSON.parse(data.toString()).results;
      		
      		//让arr逐步变少
      		filterobj.forEach(function(thefilter){
      			if(thefilter.filtertitle == "学校"){
      				arr = arr.filter(function(item){
      					return thefilter.v.indexOf(item.school) != -1;
      				});
      			}else if(thefilter.filtertitle == "类型"){
      				arr = arr.filter(function(item){
      					return thefilter.v.indexOf(item.type) != -1;
      				});
      			}else if(thefilter.filtertitle == "所需金额范围"){
      				arr = arr.filter(function(item){
      					return item.need >= thefilter.v.scaleLeft && item.need <= thefilter.v.scaleRight;
      				});
      			}else if(thefilter.filtertitle == "收益日期"){
                              arr = arr.filter(function(item){
                                    var d1 = new Date(item.earnings_time);
                                    var d2 = new Date(thefilter.v.byear , thefilter.v.bmonth - 1 , thefilter.v.bday );
                                    var d3 = new Date(thefilter.v.eyear , thefilter.v.emonth - 1, thefilter.v.eday );
                                    return (d1 > d2 && d1 < d3);
                              });
                        }
      		});

      		res.json({"results" : arr});
      	});
    });
});

//静态资源文件
app.use(express.static("www"));

//监听
app.listen(3000,function(err){
	if(!err){
		console.log("程序已经运行在3000端口");
	}
});