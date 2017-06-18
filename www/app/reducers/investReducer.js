let d1 = new Date();
let d2 = new Date(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * 180);

let initState = {
	"filters" : {	//全部的过滤器初始值
		"schools" : [],
		"types" : [],
		"need" : {"min" : 0 , "max" : 0},
		"shouyiriqi" : {
			"byear" : d1.getFullYear(),
			"bmonth" : d1.getMonth(),
			"bday" : d1.getDate(),
			"eyear" : d2.getFullYear(),
			"emonth" : d2.getMonth(),
			"eday" : d2.getDate()
		}
	},
	"nowfilter" : [ //当前启用的过滤器
		// {"filtertitle" : "学校" , "v" : ["爱前端","爱苹果","爱压力"]},
		// {"filtertitle" : "类型" , "v" : ["3+2B"]},
	],
	"data" : []  //数据
}
 
export default (state = initState , action) => {
	switch(action.type){
		case "FETCHINITFILTER" :
			return {
				...state,
				filters :  action.data
			}
		case "FETCHDATA" :
			return {
				...state,
				data :  action.data.results
			}
		case "ADDFILTER" : 
			//现在要根据是否已经存在，来做不同的事情。
			return {
				...state,
				filters : {
					...state.filters,
					[action.reducerkey] : action.v
				},
				nowfilter : [
					...state.nowfilter,
					{"filtertitle" : action.title , "v" : action.v}
				],
				"data" : action.data.results
			}
		case "DELFILTER" : 
			//删除名字为action.title的那个过滤器
			return {
				...state,
				nowfilter : state.nowfilter.filter((item)=>{
					return item.filtertitle != action.title;
				}),
				"data" : action.data.results
			}
	}

	return state;
}