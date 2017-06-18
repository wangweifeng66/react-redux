var _ = require("underscore");

var results = [];
for(var i = 0 ; i < 1000 ; i++){
	let t = _.random(400,20000);
	let d = _.random(0,t);
	let n = t - d;

	let y = _.sample(["2017","2018","2019"],1)[0];
	let m = _.sample([1,2,3,4,5,6,7,8,9,10,11,12],1)[0];
	let dd = _.random(1,28);

	results.push(
		{
			"name" : "王小" + i,
			"school" : _.sample(["新东方" , "新西方" , "蓝翔" , "爱前端" , "爱苹果"],1)[0],
			"target" : t,
			"done" : d,
			"need" : n,
			"min" : 10,
			"max" : n,
			"type" : _.sample(["3 + 0B" , "6+2B" , "12+2B" , "18+2B" , "24+2B"],1)[0],
			"rate" : "11.17",
			"credit" : 6,
			"fundraising_deadline" : "2017-05-01",
			"earnings_time" : y + "-" + m + "-" + dd,
			"number_of_people":2,
			"investor" : [
				{
					"name" : "shao****" ,
					"money" : 1500,
					"anticipated" : 276,
					"time" : "2017年4月25日14:48:36"
				},
				{
					"name" : "shao****" ,
					"money" : 500,
					"anticipated" : 76,
					"time" : "2017年4月25日14:48:36"
				}
			],
			"province" : "北京",
			"education" : "高中/中专",
			"course_title": "前端大师班",
			"course_time" : "2017-04-25",
			"course_price" : 10000
		}
	)
}

var json = JSON.stringify( {"results" : JSON.stringify(results)} );

var fs = require("fs");
fs.writeFile("./database.json",json,function(){

})