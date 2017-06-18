import React from 'react';
import {delfilter} from "../../actions/investActions.js";

class Nowfilter extends React.Component{
	constructor({nowfilter}){
		super();
 
	}

	delme(filtertitle){
		this.props.dispatch(delfilter(filtertitle));
	}

	shownowfilter(){
		var arr = [];
		this.props.nowfilter.forEach((item,index) => {
			if(index != 0){
				arr.push(<li key={arr.length} className="t">且</li>);
			}
			if(item.filtertitle == "学校" || item.filtertitle == "类型"){
				arr.push( <li key={arr.length} onClick={()=>{this.delme(item.filtertitle)}}>{item.filtertitle} ：{item.v.join(" 或 ")} </li> )
			}else if(item.filtertitle == "所需金额范围" || item.filtertitle == "预期收益范围"){
				arr.push( <li key={arr.length} onClick={()=>{this.delme(item.filtertitle)}}>{item.filtertitle} ：{item.v.scaleLeft} ~ {item.v.scaleRight} </li> )
			}else if(item.filtertitle == "收益日期"){
				arr.push( <li key={arr.length} onClick={()=>{this.delme(item.filtertitle)}}>{item.filtertitle} ：从{item.v.byear}年{item.v.bmonth}月{item.v.bday}日 到 {item.v.eyear}年{item.v.emonth}月{item.v.eday}日 </li> )
			}
		});
		return (
			<ul>
				{arr}
			</ul>
		);
	}

	render(){
		return (
			<div className="nowfilter">
				<div className="row">
					<div className="col-lg-1">
						当前过滤
					</div>
					<div className="col-lg-11">
						{this.shownowfilter()}
					</div>
				</div>
			</div>
		);
	}
}

export default Nowfilter;