//得到某年某月第一天星期几
function firstDayDay(year,month){
	return (new Date(year,month - 1,1)).getDay();
}

//得到某年某月上一个月共多少天
function getPrevMonthAllDays(year,month){
	//原理用这个月的1号0点0分减去1毫秒，看看那天的日子
	return (new Date(new Date(year , month - 1 , 1) - 1)).getDate();
}

//得到某年某月共多少天
function getMonthAllDays(year,month){
	if(month == 12){
		return (new Date(new Date(year + 1, 0 , 1) - 1)).getDate();
	}else{
		return (new Date(new Date(year, month , 1) - 1)).getDate();
	}
}

 
function createDateTable(year,mounth){
	var reararr = [23,24,25,26,27,28,29,30,31];
	var montharr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	var headarr = [1,2,3,4,5,6,7,8,9,10,11,12,13];

	var _firstDayDay = firstDayDay(year,mounth);
	var _getPrevMonthAllDays = getPrevMonthAllDays(year,mounth);
	
	//处理尾巴
	for (var i = 0; i < 31 - _getPrevMonthAllDays; i++) {
		reararr.pop();
	};
	reararr = reararr.slice(reararr.length - _firstDayDay);

	//处理本月
	montharr = montharr.slice(0 , getMonthAllDays(year,mounth));

	//处理下月
	headarr = headarr.slice(0,42 - montharr.length - reararr.length);

	return {
		reararr,
		montharr,
		headarr
	}
}

export default createDateTable;