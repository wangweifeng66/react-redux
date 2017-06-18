import React from "react";
import createDateTable from "./createDateTable.js";
import YearMonthPicker from "./YearMonthPicker.js";
 
class Canlendar extends React.Component{

	constructor({onpick , year , month , day , earliest , latest}){
		super();
 
		//数据
		this.state = {
			year,
			month,
			day , 
			showPicker : false
		}
	}

	//显示日期
	showDateTable(){
		var {reararr,montharr,headarr} = createDateTable(this.state.year,this.state.month);
		var dataArr = reararr.concat(montharr,headarr);

		var trs = [];
		var tds = [];

		//类名的函数
		let classname = (day,index)=>{
			//这个日的日期
			var thedate = new Date(this.state.year , this.state.month , day);
			//最早的那个日子
			if(this.props.earliest){
				var earliestdate = new Date(this.props.earliest.year ,this.props.earliest.month , this.props.earliest.day);
				if(thedate - earliestdate < 0){
					return "gray earliestinvalid";
				}
			}

			if(this.props.latest){
				var latestdate = new Date(this.props.latest.year ,this.props.latest.month , this.props.latest.day);
				if(latestdate - thedate< 0){
					return "gray latestdateinvalid";
				}
			}


			//比较
			if(index < reararr.length){
				return "gray prev";
			}else if(index >= 42 - headarr.length){
				return "gray next";
			}else{
				if(day == this.state.day){
					return "inmonth cur";
				}
				return "inmonth"
			}

			return "";
		}

		dataArr.forEach((day,index)=>{
			if(index % 7 == 0 && index != 0){
				trs.push(<tr key={index}>{tds}</tr>);
				tds = [];
			}
			tds.push(<td data-day={day} className={classname(day,index)} key={index}>{day}</td>)
		});

		trs.push(<tr key={5}>{tds}</tr>);
		return (<tbody>{trs}</tbody>);
	}
 
	//下一月
	goNextMonth(){
		if(this.state.month != 12){
			this.setState({"month" : this.state.month + 1});
		}else{
			this.setState({"month" : 1 , "year" : this.state.year + 1});
		}

		this.setState({"day" : 0});
	}

	//上一月
	goPrevMonth(){
		if(this.state.month != 1){
			this.setState({"month" : this.state.month - 1});
		}else{
			this.setState({"month" : 12 , "year" : this.state.year - 1});
		}

		this.setState({"day" : 0});
	}

	//子组件的委托函数
	onpick({year,month}){
		this.setState({
			showPicker : false , 
			year,
			month
		})
	}

	//显示年月选择框
	showpicker(){
		if(this.state.showPicker){
			return 	<YearMonthPicker year={this.state.year} month={this.state.month} onpick={(this.onpick).bind(this)}></YearMonthPicker>;
		}else{
			return "";
		}
	}

	//上树之后
	componentDidMount(){
		var self = this;
		//绑定prev的事件监听
		$(this.refs.table).delegate("td.prev","click",function(){
			self.goPrevMonth();
		});

		$(this.refs.table).delegate("td.next","click",function(){
			self.goNextMonth();
		});

		$(this.refs.table).delegate("td.prev","click",function(){
			self.goPrevMonth();
		});

		$(this.refs.table).delegate("td.inmonth","click",function(){
			self.setState({"day" : Number($(this).attr("data-day"))})
			//传给父亲
			self.props.onpick(self.state);
		});


		$(this.refs.canlendarChooser).mousewheel(function(event,delta){
			if(delta < 0){
				self.goNextMonth();
			}else{
				self.goPrevMonth();
			}
		})
	}

	render(){
		return (
			<div className="canlendarChooser" ref="canlendarChooser">
				<h4 onClick={()=>{this.setState({"showPicker" : true})}}>
					{this.state.year}年{this.state.month}月
				</h4>

				<a href="javascript:void(0);" className="leftBtn"  onClick={(this.goPrevMonth).bind(this)}></a>
				<a href="javascript:void(0);" className="rightBtn" onClick={(this.goNextMonth).bind(this)}></a>

				{this.showpicker()}

				<table ref="table">
					<thead>
						<tr>
							{["周日","周一","周二","周三","周四","周五","周六"].map((item,index)=>{
								return <th key={index}>{item}</th>
							})}
						</tr>
					</thead>
					{this.showDateTable()}
				</table>
			</div>
		);
	}
}

export default Canlendar;