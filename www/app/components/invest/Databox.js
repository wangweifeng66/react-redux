import React from 'react';
import {connect} from 'react-redux';
import Datarow from "./Datarow.js";
import SetTableBox from "./SetTableBox.js";

class Databox extends React.Component{
	constructor({data}){
		super();

		this.state = {
			settableboxshow : false , 
			tablecol : [
				{"fieldname" : "name" 	, "fieldchinesename" : "姓名" , "show" : true},
				{"fieldname" : "school" , "fieldchinesename" : "学校" , "show" : true},
				{"fieldname" : "target" , "fieldchinesename" : "目标金额" , "show" : true},
				{"fieldname" : "done" , "fieldchinesename" : "已完成" , "show" : true},
				{"fieldname" : "need" , "fieldchinesename" : "仍需要金额" , "show" : true},
				{"fieldname" : "min" , "fieldchinesename" : "最小投资" , "show" : false},
				{"fieldname" : "max" , "fieldchinesename" : "最大投资" , "show" : false},
				{"fieldname" : "type" , "fieldchinesename" : "类型" , "show" : false},
				{"fieldname" : "rate" , "fieldchinesename" : "回报率" , "show" : false},
				{"fieldname" : "credit" , "fieldchinesename" : "信用" , "show" : false},
				{"fieldname" : "province" , "fieldchinesename" : "省份" , "show" : false},
				{"fieldname" : "earnings_time" , "fieldchinesename" : "收益日期" , "show" : true}
			]
		}
	}

	showSetTableBox(){
		return this.state.settableboxshow ? 
			<SetTableBox 
				setSetTableBoxShow={(this.setSetTableBoxShow).bind(this)} 
				tablecol = {this.state.tablecol}
				onsubmit = {(this.submithandler).bind(this)}
			></SetTableBox> 
		: "";
	}

	submithandler(data){
		this.setState({"tablecol" : this.state.tablecol.map((obj)=>{
			return {
				...obj,
				"show" : data[obj.fieldchinesename]
			}
		})});

		this.setSetTableBoxShow(false);
	}

	//设置设置表格的显示与否
	setSetTableBoxShow(booleanvalue){
		this.setState({settableboxshow : booleanvalue})
	}

	render(){
		return (
			<div className="databox">
				<hr/>
				<br/>
				共{this.props.data.length}条结果
				<div className="text-right">
					<a href="javascript:;" onClick={()=>{this.setSetTableBoxShow(true)}}>设置表格显示字段</a>

					{this.showSetTableBox()}
				</div>
				<table>
					<thead>
						<tr>
							{this.state.tablecol.map((item,index)=>{
								if(item.show){
									return <th key={index}>{item.fieldchinesename}</th>
								}
							})}
						</tr>
					</thead>
					<tbody>
						{this.props.data.map((data,index)=>{
							return <Datarow key={index} data={data} tablecol={this.state.tablecol} /> 
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			data : state.investReducer.data
		}
	}
)(Databox);