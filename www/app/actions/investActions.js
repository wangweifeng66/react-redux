export const fetchInitFilter = () => { return (dispatch) => {
	$.get("/api/filters.json" , function(data){
		dispatch({"type" : "FETCHINITFILTER" ,  data : data})
	});
}};


export const fetchData = () => { return (dispatch) => {
	$.post("/api",{"filter" : "[]"},function(data){
		dispatch({"type" : "FETCHDATA" , "data" : data})
	});
}};

export const addfilter = (title,v,reducerkey) => {return (dispatch,getState) => { 
	//全部的状态，concat不会影响原数组
	var nowfilter = getState().investReducer.nowfilter.concat([{"filtertitle" : title , "v" :v}])

	$.ajax({
		"url" : "/api",
		"data" : {"filter" : JSON.stringify( nowfilter )} , 
		"type" : "post",
		"success" : function(data){
			dispatch({"type" : "ADDFILTER" , title , v , reducerkey , data});
		}
	});
		
}};

export const delfilter = (title) =>{
	return(dispatch , getState)=>{


		//删除这个filter
		var nowfilter = getState().investReducer.nowfilter.filter(function(item){
			return item.filtertitle != title;
		})

		$.ajax({
			"url" : "/api",
			"data" : {"filter" : JSON.stringify( nowfilter )} , 
			"type" : "post",
			"success" : function(data){
				dispatch({"type" : "DELFILTER" , title , data});
			}
		});
	}
}